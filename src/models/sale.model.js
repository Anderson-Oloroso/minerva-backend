export class SaleModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findById(id) {
        const query = `SELECT S.id_sale, S.id_user, S.date_sale, S.total, S.state_sale,
                CONCAT(U.name_user, ' ', U.last_name) AS user_name,
                SD.id_sale_details, SD.id_book, SD.amount, SD.unit_price
            FROM sales S
            INNER JOIN sale_details SD ON S.id_sale = SD.id_sale
            INNER JOIN users U ON S.id_user = U.id_user
            WHERE S.id_sale = ?
            ORDER BY SD.id_sale_details ASC`;
        const [rows] = await this.pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return {
            id_sale: rows[0].id_sale,
            id_user: rows[0].id_user,
            date_sale: rows[0].date_sale,
            total: rows[0].total,
            state_sale: rows[0].state_sale,
            user_name: rows[0].user_name,
            details: rows.map(({ id_sale_details, id_book, amount, unit_price }) => ({
                id_sale_detail: id_sale_details,
                id_book,
                amount,
                unit_price
            }))
        };
    }

    async findAll(idUser) {
        const userFilter = idUser === undefined ? '' : 'WHERE S.id_user = ?';
        const query = `SELECT S.id_sale, S.id_user, S.date_sale, S.total, S.state_sale,
                CONCAT(U.name_user, ' ', U.last_name) AS user_name,
                SD.id_sale_details, SD.id_book, SD.amount, SD.unit_price
            FROM sales S
            INNER JOIN sale_details SD ON S.id_sale = SD.id_sale
            INNER JOIN users U ON S.id_user = U.id_user
            ${userFilter}
            ORDER BY S.date_sale DESC, S.id_sale DESC, SD.id_sale_details ASC`;
        const [rows] = await this.pool.execute(query, idUser === undefined ? [] : [idUser]);
        const sales = new Map();

        for (const row of rows) {
            if (!sales.has(row.id_sale)) {
                sales.set(row.id_sale, {
                    id_sale: row.id_sale,
                    id_user: row.id_user,
                    date_sale: row.date_sale,
                    total: row.total,
                    state_sale: row.state_sale,
                    user_name: row.user_name,
                    details: []
                });
            }

            sales.get(row.id_sale).details.push({
                id_sale_detail: row.id_sale_details,
                id_book: row.id_book,
                amount: row.amount,
                unit_price: row.unit_price
            });
        }

        return Array.from(sales.values());
    }

    async findAllByUserId(idUser) {
        return this.findAll(idUser);
    }

    async create(data) {
        const [resultSets] = await this.pool.query(
            'CALL sp_create_sale(?, ?)',
            [data.id_user, JSON.stringify(data.details)]
        );
        const saleResult = resultSets[0]?.[0];

        if (!saleResult?.id_sale) {
            throw new Error('El procedimiento sp_create_sale no devolvió el ID de la venta.');
        }

        const sale = await this.findById(saleResult.id_sale);
        if (!sale) {
            throw new Error('La venta se creó, pero no fue posible recuperar sus datos.');
        }

        return sale;
    }

    async confirm(id) {
        await this.pool.query('CALL sp_confirm_sale(?)', [id]);
        return this.findById(id);
    }

    async reject(id) {
        await this.pool.query('CALL sp_reject_sale(?)', [id]);
        return this.findById(id);
    }
}