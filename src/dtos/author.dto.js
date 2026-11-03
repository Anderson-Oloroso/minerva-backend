export class AuthorDTO {
    constructor(data = {}) {
        this.id = data.id !== undefined ? Number(data.id) : undefined;
        this.name = data.name || data.name_author || '';
    }

    static from(data) {
        if (!data) return null;
        return new AuthorDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new AuthorDTO(item));
    }
}
