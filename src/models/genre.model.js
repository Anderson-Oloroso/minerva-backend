export class GenreModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findAll() {
        const query = 'SELECT id_genre AS id, name_genre AS genre FROM genres ORDER BY id_genre ASC';
        const [ rows ] = await this.pool.execute(query);
        return rows;
    }

    async findById(id) {
        const query = 'SELECT id_genre AS id, name_genre AS genre FROM genres WHERE id_genre = ?';
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(data) {
        const query = 'INSERT INTO genres (name_genre) VALUES (?)';
        const [ result ] = await this.pool.execute(query, [data.genre]);
        return {
            id: result.insertId,
            genre: data.genre
        };
    }

    async update(id, data) {
        const query = 'UPDATE genres SET name_genre = IFNULL(?, name_genre) WHERE id_genre = ?';
        const [ result ] = await this.pool.execute(query, [data.genre, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return {
            id: Number(id),
            genre: data.genre === null ? '[AVISO]: genero no modificado' : data.genre
        };
    }

    async delete(id) {
        const query = 'DELETE FROM genres WHERE id_genre = ?';
        const [ result ] = await this.pool.execute(query, [id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.affectedRows > 0;
    }
}

export default GenreModel;
