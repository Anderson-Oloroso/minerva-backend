export class PublisherDTO {
    constructor(data = {}) {
        this.id = data.id !== undefined ? Number(data.id) : undefined;
        this.publisher = data.publisher || data.name_publisher || '';
    }

    static from(data) {
        if (!data) return null;
        return new PublisherDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new PublisherDTO(item));
    }
}
