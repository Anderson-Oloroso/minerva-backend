import { Router } from 'express';
import { PublisherDTO } from '../dtos/publishers.dto.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { ValidationMiddleware } from '../middlewares/validate.middleware.js';
import { PublisherController } from '../controllers/publishers.controller.js';

export class PublisherRoutes {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', PublisherController.list);

        this.router.post(
            '/',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            PublisherDTO.createRules,
            ValidationMiddleware.handle,
            PublisherController.create
        );

        this.router.put(
            '/:id',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            PublisherDTO.idRules,
            ValidationMiddleware.handle,
            PublisherController.update
        );

        this.router.delete(
            '/:id',
            AuthMiddleware.requireAuth,
            AuthMiddleware.requireAdmin,
            PublisherDTO.idRules,
            ValidationMiddleware.handle,
            PublisherController.delete
        );
    }

    getRouter() {
        return this.router;
    }
}

export const publisherRoutes = new PublisherRoutes();
export default publisherRoutes.router;
