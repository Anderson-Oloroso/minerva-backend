import { Router } from 'express';
import { AuthorDTO } from '../dtos/authors.dto.js';
import { ValidationMiddleware } from '../middlewares/validate.middleware.js';
import { AuthorController } from '../controllers/authors.controller.js';

export class AuthorRoutes {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Endpoint GET para listar autores
        this.router.get('/', AuthorController.list);

        // Endpoint POST para crear un autor
        this.router.post(
            '/',
            AuthorDTO.createRules,
            ValidationMiddleware.handle,
            AuthorController.create
        );

        // Endpoint PUT para actualizar autor
        this.router.put(
            '/:id',
            AuthorDTO.idRules,
            ValidationMiddleware.handle,
            AuthorController.update
        );

        // Endpoint DELETE para eliminar un autor
        this.router.delete(
            '/:id',
            AuthorDTO.idRules,
            ValidationMiddleware.handle,
            AuthorController.delete
        );
    }

    getRouter() {
        return this.router;
    }
}

export const authorRoutes = new AuthorRoutes();
export default authorRoutes.router;
