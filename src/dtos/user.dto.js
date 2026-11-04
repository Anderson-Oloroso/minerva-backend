export class UserDTO {
    constructor(data = {}) {
        this.id_user = data.id_user;
        this.name_user = data.name_user || `${data.name || ''} ${data.last_name || ''}`.trim();
        this.email = data.email;
        this.role = data.role;
    }

    static from(data) {
        if (!data) return null;
        return new UserDTO(data);
    }
}
