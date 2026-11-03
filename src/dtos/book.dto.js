export class BookDTO {
    constructor(data = {}) {
        this.id = data.id !== undefined ? Number(data.id) : undefined;
        this.title = data.title || data.name_book || '';
        this.isbn = data.isbn || '';
        this.year_publication = data.year_publication || '';
        this.no_pages = data.no_pages || '';
        this.wrote_language = data.wrote_language || '';
        this.stock = data.stock || '';
        this.id_author = data.id_author !== undefined ? Number(data.id_author) : undefined;
        this.id_publisher = data.id_publisher !== undefined ? Number(data.id_publisher) : undefined;
        this.id_genre = data.id_genre !== undefined ? Number(data.id_genre) : undefined;    
    }

    static from(data) {
        if (!data) return null;
        return new BookDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new BookDTO(item));
    }
}