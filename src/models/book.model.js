export class BookModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findAll(){
        const query = `SELECT B.id, B.tittle, B.isbn, B.year_publication, B.no_pages, B.wrote_language, B.price,
            B.stock, G.name_genre, P.name_publisher, A.name_author FROM books B
            LEFT JOIN genres G ON B.id_genre = G.id
            LEFT JOIN publishers P ON B.id_publisher = P.id
            LEFT JOIN authors A ON B.id_author = A.id`;
        const [rows] = await this.pool.query(query);
        return rows ?? [];
    }

    async findById(id) {
        const query = `SELECT B.id, B.tittle, B.isbn, B.year_publication, B.no_pages, B.wrote_language, B.price,
            B.stock, G.name_genre, P.name_publisher, A.name_author FROM books B 
            LEFT JOIN genres G ON B.id_genre = G.id
            LEFT JOIN publishers P ON B.id_publisher = P.id
            LEFT JOIN authors A ON B.id_author = A.id
            WHERE B.id = ?`;
        const [rows] = await this.pool.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(data) {
        const query = `INSERT INTO books (tittle, isbn, year_publication, no_pages, wrote_language, price, stock, id_genre, id_publisher, id_author)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
        const [result] = await this.pool.query(query, [
            data.tittle,
            data.isbn,  
            data.year_publication,
            data.no_pages,
            data.wrote_language,
            data.price,
            data.stock,
            data.id_genre,
            data.id_publisher,
            data.id_author
        ]);
        return {
            id: result.insertId,
            ...data
        };
    }

    async update(id, data) {
        const query = `UPDATE books SET 
            tittle = IFNULL(?, tittle),
            isbn = IFNULL(?, isbn),
            year_publication = IFNULL(?, year_publication),
            no_pages = IFNULL(?, no_pages),
            wrote_language = IFNULL(?, wrote_language),
            price = IFNULL(?, price),
            stock = IFNULL(?, stock),
            id_genre = IFNULL(?, id_genre),
            id_publisher = IFNULL(?, id_publisher),
            id_author = IFNULL(?, id_author)
            WHERE id = ?`;
        const [result] = await this.pool.query(query, [
            data.tittle,
            data.isbn,
            data.year_publication,
            data.no_pages,
            data.wrote_language,
            data.price,
            data.stock,
            data.id_genre,
            data.id_publisher,
            data.id_author,
            id
        ]);
        return result ?? null;
    }

    async delete(id) {
        const query = 'DELETE FROM books WHERE id = ?';
        const [result] = await this.pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.affectedRows > 0;
    }
}