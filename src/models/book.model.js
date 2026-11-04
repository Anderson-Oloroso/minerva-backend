export class BookModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findAll() {
        const query = `SELECT B.id_book AS id, B.title, B.isbn, B.image_url, B.year_publication, B.no_pages, B.wrote_language,
            B.price, B.stock, B.id_genre, B.id_publisher, B.id_author,
            G.name_genre, P.name_publisher, A.name_author
            FROM books B
            LEFT JOIN genres G ON B.id_genre = G.id_genre
            LEFT JOIN publishers P ON B.id_publisher = P.id_publisher
            LEFT JOIN authors A ON B.id_author = A.id_author
            ORDER BY B.id_book ASC`;
        const [rows] = await this.pool.query(query);
        return rows ?? [];
    }

    async findById(id) {
        const query = `SELECT B.id_book AS id, B.title, B.isbn, B.image_url, B.year_publication, B.no_pages, B.wrote_language,
            B.price, B.stock, B.id_genre, B.id_publisher, B.id_author,
            G.name_genre, P.name_publisher, A.name_author
            FROM books B
            LEFT JOIN genres G ON B.id_genre = G.id_genre
            LEFT JOIN publishers P ON B.id_publisher = P.id_publisher
            LEFT JOIN authors A ON B.id_author = A.id_author
            WHERE B.id_book = ?`;
        const [rows] = await this.pool.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(data) {
        const query = `INSERT INTO books (title, isbn, image_url, year_publication, no_pages, wrote_language, price, stock, id_genre, id_publisher, id_author)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await this.pool.query(query, [
            data.title,
            data.isbn,
            data.image_url || null,
            data.year_publication,
            data.no_pages,
            data.wrote_language,
            data.price,
            data.stock,
            data.id_genre,
            data.id_publisher ?? null,
            data.id_author ?? null
        ]);
        return this.findById(result.insertId);
    }

    async update(id, data) {
        const query = `UPDATE books SET
            title = IFNULL(?, title),
            isbn = IFNULL(?, isbn),
            image_url = CASE WHEN ? = '' THEN NULL ELSE IFNULL(?, image_url) END,
            year_publication = IFNULL(?, year_publication),
            no_pages = IFNULL(?, no_pages),
            wrote_language = IFNULL(?, wrote_language),
            price = IFNULL(?, price),
            stock = IFNULL(?, stock),
            id_genre = IFNULL(?, id_genre),
            id_publisher = IFNULL(?, id_publisher),
            id_author = IFNULL(?, id_author)
            WHERE id_book = ?`;
        await this.pool.query(query, [
            data.title ?? null,
            data.isbn ?? null,
            data.image_url ?? null,
            data.image_url ?? null,
            data.year_publication ?? null,
            data.no_pages ?? null,
            data.wrote_language ?? null,
            data.price ?? null,
            data.stock ?? null,
            data.id_genre ?? null,
            data.id_publisher ?? null,
            data.id_author ?? null,
            id
        ]);
        return this.findById(id);
    }

    async delete(id) {
        const query = 'DELETE FROM books WHERE id_book = ?';
        const [result] = await this.pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.affectedRows > 0;
    }
}