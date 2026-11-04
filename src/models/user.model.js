export class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findByEmail(email) {
        const query = 'SELECT id_user, dpi, name_user, last_name, phone, email, password, role FROM users WHERE email = ?';
        const [ rows ] = await this.pool.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findById(id) {
        const query = 'SELECT id_user, dpi, name_user, last_name, phone, email, role FROM users WHERE id_user = ?';
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(userData) {
        const query = 'INSERT INTO users (dpi, name_user, last_name, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [ result ] = await this.pool.execute(query, [
            userData.doc,
            userData.name,
            userData.last_name,
            userData.phone,
            userData.email,
            userData.password,
            userData.role || 'user'
        ]);

        return {
            id_user: result.insertId,
            name_user: `${userData.name} ${userData.last_name}`,
            email: userData.email,
            role: userData.role || 'user'
        };
    }
}
