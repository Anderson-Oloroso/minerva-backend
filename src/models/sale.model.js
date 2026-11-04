export class SaleModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findById(id) {
        const query = `SELECT S.id_sale, S.id_user, S.date_sale, S.total,
                SD.id_sale_details, SD.id_book, SD.amount, SD.unit_price
            FROM sales S
            INNER JOIN sale_details SD ON S.id_sale = SD.id_sale
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
            details: rows.map(({ id_sale_details, id_book, amount, unit_price }) => ({
                id_sale_detail: id_sale_details,
                id_book,
                amount,
                unit_price
            }))
        };
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
}