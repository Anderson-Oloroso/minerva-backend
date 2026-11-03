import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { LoggerMiddleware } from './middlewares/logger.js';
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import apiRouter from './routes/index.js';

export class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    initializeMiddlewares() {
        this.app.use(LoggerMiddleware.handle);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieSession({
            name: 'minerba-lib-session', // Nombre de la cookiesession
            keys: ['Alondra_|-|_871'],   // Firma que valida la sesion
            maxAge: 60 * 60 * 1000        // Duracion 1h
        }));
    }

    initializeRoutes() {
        // Endpoint de verificación / Health Check
        this.app.get('/api/minerva-lib/health', (req, res) => {
            res.status(200).json({
                status: 'ok',
                message: 'Minerva Lib API funcionando correctamente',
                timestamp: new Date().toISOString()
            });
        });

        this.app.use('/api/minerva-lib', apiRouter); // Rutas que vienen desde index.js
    }

    initializeErrorHandling() {
        this.app.use(ErrorMiddleware.handle); // Capturador de errores
    }

    getApp() {
        return this.app;
    }
}

export const appInstance = new App();
export default appInstance.app;
