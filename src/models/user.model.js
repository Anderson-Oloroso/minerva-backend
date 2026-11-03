export class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async findByEmail(email) {
        const query = 'SELECT id_client, dpi, name_client, last_name, phone, email, password, role FROM clients WHERE email = ?';
        const [ rows ] = await this.pool.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findById(id) {
        const query = 'SELECT id_client, dpi, name_client, last_name, phone, email, role FROM clients WHERE id_client = ?';
        const [ rows ] = await this.pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create(userData) {
        const query = 'INSERT INTO clients (dpi, name_client, last_name, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [ result ] = await this.pool.execute(query, [
            userData.doc,
            userData.name,
            userData.last_name,
            userData.phone,
            userData.email,
            userData.password,
            userData.role || 'client'
        ]);

        return {
            id: result.insertId,
            name: `${userData.name} ${userData.last_name}`,
            email: userData.email,
            role: userData.role || 'client'
        };
    }
}

export default UserModel;
