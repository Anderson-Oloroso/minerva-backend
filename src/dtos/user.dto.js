export class UserDTO {
    constructor(data = {}) {
        this.id = data.id || data.id_client;
        this.name = data.name || `${data.name_client || ''} ${data.last_name || ''}`.trim();
        this.email = data.email;
        this.role = data.role;
    }

    static from(data) {
        if (!data) return null;
        return new UserDTO(data);
    }
}
