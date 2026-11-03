import { apiPrefix, serverPort } from './config/env.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { Database } from './config/database.config.js';

export class Server {
    #app;
    #port;
    #serverInstance;

    constructor(expressApp = app, port = serverPort) {
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
            console.log(`Health Check disponible en http://localhost:${this.#port}${apiPrefix === '/' ? '' : apiPrefix}/health`);
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
