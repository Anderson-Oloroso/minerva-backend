import { createPool } from 'mysql2/promise';
import './env.config.js';

export class Database {
    static #pool = null;

    static getPool() {
        if (!Database.#pool) {
            Database.#pool = createPool({
                host: process.env.DB_HOST || 'db',
                port: Number(process.env.DB_PORT) || 3306,
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || 'secretpassword',
                database: process.env.DB_NAME || 'minerva_lib_db',
                waitForConnections: true,
                connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
            });
        }
        return Database.#pool;
    }

    static async getConnection() {
        return await Database.getPool().getConnection();
    }

    static async execute(query, params = []) {
        return await Database.getPool().execute(query, params);
    }

    static async checkConnection() {
        const connection = await Database.getConnection();
        connection.release();
        return true;
    }

    static async close() {
        if (Database.#pool) {
            await Database.#pool.end();
            Database.#pool = null;
        }
    }
}

export const Pool = Database.getPool();
export default Database;
