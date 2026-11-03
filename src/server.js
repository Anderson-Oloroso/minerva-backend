import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from './app.js';
import Database from './config/database.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export class Server {
    #app;
    #port;
    #serverInstance;

    constructor(expressApp = app, port = process.env.PORT || 5000) {
        this.#app = expressApp;
        this.#port = port;
        this.#serverInstance = null;
    }

    get port() {
        return this.#port;
    }

    get app() {
        return this.#app;
    }

    async connectDatabase() {
        try {
            await Database.checkConnection();
            console.log('Conexión con la base de datos exitosa: minerva_lib_db');
        } catch (err) {
            console.error('Error al conectarse con la base de datos minerva_lib_db:', err.message);
            process.exit(1);
        }
    }

    listen() {
        this.#serverInstance = this.#app.listen(this.#port, () => {
            console.log(`Servidor Minerva Lib corriendo en http://localhost:${this.#port}`);
            console.log(`Health Check disponible en http://localhost:${this.#port}/api/minerva-lib/health`);
        });
        return this.#serverInstance;
    }

    async start() {
        this.listen();
        await this.connectDatabase();
    }

    async stop() {
        if (this.#serverInstance) {
            await new Promise((resolve) => this.#serverInstance.close(resolve));
        }
        await Database.close();
    }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
    const server = new Server();
    server.start();
}

export default Server;
