import { Router } from 'express';
import authorsRouter from './authors.route.js';
import authRouter from './auth.route.js';
import publishersRoute from './publishers.route.js';
import genresRouter from './genres.route.js';

export class ApiRouter {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.use('/authors', authorsRouter);
        this.router.use('/auth', authRouter);
        this.router.use('/publishers', publishersRoute);
        this.router.use('/genres', genresRouter);
    }

    getRouter() {
        return this.router;
    }
}

export const apiRouter = new ApiRouter();
export default apiRouter.router;
