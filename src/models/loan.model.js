export class LoanModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findById(id) {
        const query = `SELECT L.id_loan, L.id_user, L.date_loan, L.expected_return_date,
                L.return_date, L.state_loan, CONCAT(U.name_user, ' ', U.last_name) AS user_name,
                LD.id_loan_detail, LD.id_book,
                LD.state_book_out, LD.state_book_in
            FROM loans L
            INNER JOIN loan_details LD ON L.id_loan = LD.id_loan
            INNER JOIN users U ON L.id_user = U.id_user
            WHERE L.id_loan = ?
            ORDER BY LD.id_loan_detail ASC`;
        const [rows] = await this.pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return {
            id_loan: rows[0].id_loan,
            id_user: rows[0].id_user,
            date_loan: rows[0].date_loan,
            expected_return_date: rows[0].expected_return_date,
            return_date: rows[0].return_date,
            state_loan: rows[0].state_loan,
            user_name: rows[0].user_name,
            details: rows.map(({ id_loan_detail, id_book, state_book_out, state_book_in }) => ({
                id_loan_detail,
                id_book,
                state_book_out,
                state_book_in
            }))
        };
    }

    async findAll(idUser) {
        const userFilter = idUser === undefined ? '' : 'WHERE L.id_user = ?';
        const query = `SELECT L.id_loan, L.id_user, L.date_loan, L.expected_return_date,
                L.return_date, L.state_loan, CONCAT(U.name_user, ' ', U.last_name) AS user_name,
                LD.id_loan_detail, LD.id_book,
                LD.state_book_out, LD.state_book_in
            FROM loans L
            INNER JOIN loan_details LD ON L.id_loan = LD.id_loan
            INNER JOIN users U ON L.id_user = U.id_user
            ${userFilter}
            ORDER BY L.date_loan DESC, L.id_loan DESC, LD.id_loan_detail ASC`;
        const [rows] = await this.pool.execute(query, idUser === undefined ? [] : [idUser]);
        const loans = new Map();

        for (const row of rows) {
            if (!loans.has(row.id_loan)) {
                loans.set(row.id_loan, {
                    id_loan: row.id_loan,
                    id_user: row.id_user,
                    date_loan: row.date_loan,
                    expected_return_date: row.expected_return_date,
                    return_date: row.return_date,
                    state_loan: row.state_loan,
                    user_name: row.user_name,
                    details: []
                });
            }

            loans.get(row.id_loan).details.push({
                id_loan_detail: row.id_loan_detail,
                id_book: row.id_book,
                state_book_out: row.state_book_out,
                state_book_in: row.state_book_in
            });
        }

        return Array.from(loans.values());
    }

    async findAllByUserId(idUser) {
        return this.findAll(idUser);
    }

    async create(data) {
        const expectedReturnDate = new Date(data.expected_return_date)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');
        const [resultSets] = await this.pool.query(
            'CALL sp_create_loan(?, ?, ?)',
            [data.id_user, expectedReturnDate, JSON.stringify(data.details)]
        );
        const loanResult = resultSets[0]?.[0];

        if (!loanResult?.id_loan) {
            throw new Error('El procedimiento sp_create_loan no devolvió el ID del préstamo.');
        }

        const loan = await this.findById(loanResult.id_loan);
        if (!loan) {
            throw new Error('El préstamo se creó, pero no fue posible recuperar sus datos.');
        }

        return loan;
    }

    async approve(id, details) {
        await this.pool.query(
            'CALL sp_approve_loan(?, ?)',
            [id, JSON.stringify(details)]
        );
        return this.findById(id);
    }

    async requestReturn(id, idUser) {
        await this.pool.query('CALL sp_request_loan_return(?, ?)', [id, idUser]);
        return this.findById(id);
    }

    async reject(id) {
        await this.pool.query('CALL sp_reject_loan(?)', [id]);
        return this.findById(id);
    }

    async returnLoan(id, details) {
        await this.pool.query(
            'CALL sp_return_loan(?, ?)',
            [id, JSON.stringify(details)]
        );

        return this.findById(id);
    }
}
