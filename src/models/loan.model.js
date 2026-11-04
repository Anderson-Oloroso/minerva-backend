export class LoanModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findById(id) {
        const query = `SELECT L.id_loan, L.id_client, L.date_loan, L.expected_return_date,
                L.return_date, L.state_loan, LD.id_loan_detail, LD.id_book,
                LD.state_book_out, LD.state_book_in
            FROM loans L
            INNER JOIN loan_details LD ON L.id_loan = LD.id_loan
            WHERE L.id_loan = ?
            ORDER BY LD.id_loan_detail ASC`;
        const [rows] = await this.pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return {
            id_loan: rows[0].id_loan,
            id_client: rows[0].id_client,
            date_loan: rows[0].date_loan,
            expected_return_date: rows[0].expected_return_date,
            return_date: rows[0].return_date,
            state_loan: rows[0].state_loan,
            details: rows.map(({ id_loan_detail, id_book, state_book_out, state_book_in }) => ({
                id_loan_detail,
                id_book,
                state_book_out,
                state_book_in
            }))
        };
    }

    async create(data) {
        const [resultSets] = await this.pool.query(
            'CALL sp_create_loan(?, ?, ?)',
            [data.id_client, data.expected_return_date, JSON.stringify(data.details)]
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

    async returnLoan(id, details, idClient) {
        const [rows] = await this.pool.execute(
            'SELECT id_client FROM loans WHERE id_loan = ?',
            [id]
        );

        if (rows.length === 0 || Number(rows[0].id_client) !== Number(idClient)) {
            return null;
        }

        await this.pool.query(
            'CALL sp_return_loan(?, ?)',
            [id, JSON.stringify(details)]
        );

        return this.findById(id);
    }
}
