import { Router } from 'express';
import { GenreDTO } from '../dtos/genres.dto.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { ValidationMiddleware } from '../middlewares/validate.middleware.js';
import { GenreController } from '../controllers/genres.controller.js';

export class GenreRoutes {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', GenreController.list);

        this.router.post(
            '/',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            GenreDTO.createRules,
            ValidationMiddleware.handle,
            GenreController.create
        );

        this.router.put(
            '/:id',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            GenreDTO.idRules,
            ValidationMiddleware.handle,
            GenreController.update
        );

        this.router.delete(
            '/:id',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            GenreDTO.idRules,
            ValidationMiddleware.handle,
            GenreController.delete
        );
    }

    getRouter() {
        return this.router;
    }
}

export const genreRoutes = new GenreRoutes();
export default genreRoutes.router;
