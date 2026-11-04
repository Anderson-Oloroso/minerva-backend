export class BookDTO {
    constructor(data = {}) {
        this.id = data.id !== undefined ? Number(data.id) : undefined;
        this.title = data.title ?? '';
        this.isbn = data.isbn ?? '';
        this.year_publication = data.year_publication ?? '';
        this.no_pages = data.no_pages ?? '';
        this.wrote_language = data.wrote_language ?? '';
        this.price = data.price ?? '';
        this.stock = data.stock ?? '';
        this.id_author = data.id_author === undefined ? undefined : data.id_author === null ? null : Number(data.id_author);
        this.id_publisher = data.id_publisher === undefined ? undefined : data.id_publisher === null ? null : Number(data.id_publisher);
        this.id_genre = data.id_genre === undefined ? undefined : data.id_genre === null ? null : Number(data.id_genre);
        this.name_author = data.name_author ?? null;
        this.name_publisher = data.name_publisher ?? null;
        this.name_genre = data.name_genre ?? '';
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