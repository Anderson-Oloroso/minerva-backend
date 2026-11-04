export class GenreDTO {
    constructor(data = {}) {
        this.id = data.id !== undefined ? Number(data.id) : undefined;
        this.genre = data.genre || data.name_genre || '';
    }

    static from(data) {
        if (!data) return null;
        return new GenreDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new GenreDTO(item));
    }
}
