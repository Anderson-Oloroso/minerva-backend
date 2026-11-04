import './config/env.config.js';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger.js';
import { errorHandler } from './middlewares/error.middleware.js';
import passport from './config/passport.js';
import apiRouter from './routes/index.js';
import { apiPrefix } from './config/version.config.js';

const corsOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000;
const rateLimitMaxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
const healthPath = apiPrefix === '/' ? '/health' : `${apiPrefix}/health`;

export class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    initializeMiddlewares() {
        this.app.use(logger);
        this.app.use(cors(corsOrigins.length > 0 ? { origin: corsOrigins } : {}));
        this.app.use(express.json());
        this.app.use(rateLimit({
            windowMs: rateLimitWindowMs,
            limit: rateLimitMaxRequests,
            standardHeaders: true,
            legacyHeaders: false
        }));
        this.app.use(passport.initialize());
    }

    initializeRoutes() {
        // Endpoint de verificación / Health Check
        this.app.get(healthPath, (req, res) => {
            res.status(200).json({
                status: 'ok',
                message: 'Minerva Lib API funcionando correctamente',
                timestamp: new Date().toISOString()
            });
        });

        this.app.use(apiPrefix, apiRouter);
    }

    initializeErrorHandling() {
        this.app.use(errorHandler);
    }

    getApp() {
        return this.app;
    }
}

export const appInstance = new App();
export default appInstance.app;
