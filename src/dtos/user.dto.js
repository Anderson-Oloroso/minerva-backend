export class UserDTO {
    constructor(data = {}) {
        this.id_user = data.id_user;
        this.name_user = data.name_user || `${data.name || ''} ${data.last_name || ''}`.trim();
        this.dpi = data.dpi;
        this.last_name = data.last_name;
        this.phone = data.phone;
        this.email = data.email;
        this.role = data.role;
        this.is_active = data.is_active === undefined ? undefined : Boolean(data.is_active);
    }

    static from(data) {
        if (!data) return null;
        return new UserDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new UserDTO(item));
    }
}
