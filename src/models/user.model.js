export class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findByEmail(email) {
        const query = 'SELECT id_user, dpi, name_user, last_name, phone, email, password, role, is_active FROM users WHERE email = ? AND is_active = TRUE';
        const [ rows ] = await this.pool.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findById(id) {
        const query = `SELECT id_user, dpi, name_user, last_name, phone, email, role, is_active
            FROM users WHERE id_user = ?`;
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findActiveById(id) {
        const query = `SELECT id_user, dpi, name_user, last_name, phone, email, role, is_active
            FROM users WHERE id_user = ? AND is_active = TRUE`;
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findAll() {
        const query = `SELECT id_user, dpi, name_user, last_name, phone, email, role, is_active
            FROM users ORDER BY id_user ASC`;
        const [ rows ] = await this.pool.execute(query);
        return rows;
    }

    async create(userData) {
        const query = `INSERT INTO users (dpi, name_user, last_name, phone, email, password, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [ result ] = await this.pool.execute(query, [
            userData.dpi,
            userData.name_user,
            userData.last_name,
            userData.phone,
            userData.email,
            userData.password,
            userData.role || 'user'
        ]);

        return this.findById(result.insertId);
    }

    async update(id, data) {
        const fields = {
            dpi: 'dpi',
            name_user: 'name_user',
            last_name: 'last_name',
            phone: 'phone',
            email: 'email',
            password: 'password',
            role: 'role',
            is_active: 'is_active'
        };
        const updates = Object.entries(fields)
            .filter(([key]) => data[key] !== undefined)
            .map(([key, column]) => ({ column, value: data[key] }));

        if (updates.length === 0) {
            return this.findById(id);
        }

        const assignments = updates.map(({ column }) => `${column} = ?`).join(', ');
        await this.pool.execute(
            `UPDATE users SET ${assignments} WHERE id_user = ?`,
            [...updates.map(({ value }) => value), id]
        );
        return this.findById(id);
    }

    async deactivate(id) {
        const [result] = await this.pool.execute(
            'UPDATE users SET is_active = FALSE WHERE id_user = ? AND is_active = TRUE',
            [id]
        );
        return result.affectedRows > 0;
    }
}
