export class PublisherModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findAll() {
        const query = 'SELECT id_publisher AS id, name_publisher AS publisher FROM publishers ORDER BY id_publisher ASC';
        const [ rows ] = await this.pool.execute(query);
        return rows;
    }

    async findById(id) {
        const query = 'SELECT id_publisher AS id, name_publisher AS publisher FROM publishers WHERE id_publisher = ?';
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(data) {
        const query = 'INSERT INTO publishers (name_publisher) VALUES (?)';
        const [ result ] = await this.pool.execute(query, [data.publisher]);
        return {
            id: result.insertId,
            publisher: data.publisher
        };
    }

    async update(id, data) {
        const query = 'UPDATE publishers SET name_publisher = IFNULL(?, name_publisher) WHERE id_publisher = ?';
        const [ result ] = await this.pool.execute(query, [data.publisher, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return {
            id: Number(id),
            publisher: data.publisher === null ? '[AVISO]: Editorial no modificada' : data.publisher
        };
    }

    async delete(id) {
        const query = 'DELETE FROM publishers WHERE id_publisher = ?';
        const [ result ] = await this.pool.execute(query, [id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.affectedRows > 0;
    }
}

export default PublisherModel;
