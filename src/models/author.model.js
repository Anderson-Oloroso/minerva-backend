export class AuthorModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findAll() {
        const query = 'SELECT id_author AS id, name_author AS name FROM authors ORDER BY id_author ASC';
        const [ rows ] = await this.pool.execute(query);
        return rows;
    }

    async findById(id) {
        const query = 'SELECT id_author AS id, name_author AS name FROM authors WHERE id_author = ?';
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(data) {
        const query = 'INSERT INTO authors (name_author) VALUES (?)';
        const [ result ] = await this.pool.execute(query, [data.name_author]);
        return {
            id: result.insertId,
            name: data.name_author
        };
    }

    async update(id, data) {
        const query = 'UPDATE authors SET name_author = IFNULL(?, name_author) WHERE id_author = ?';
        await this.pool.execute(query, [data.name_author, id]);
        return this.findById(id);
    }

    async delete(id) {
        const query = 'DELETE FROM authors WHERE id_author = ?';
        const [ result ] = await this.pool.execute(query, [id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.affectedRows > 0;
    }
}
