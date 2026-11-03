import { Router } from 'express';
import { AuthDTO } from '../dtos/auth.dto.js';
import { ValidationMiddleware } from '../middlewares/validate.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';

export class AuthRoutes {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            '/register',
            AuthDTO.registerRules,
            ValidationMiddleware.handle,
            AuthController.register
        );

        this.router.post(
            '/login',
            AuthDTO.loginRules,
            ValidationMiddleware.handle,
            AuthController.login
        );

        this.router.post('/logout', AuthController.logout);

        this.router.get('/profile', AuthController.getProfile);
    }

    getRouter() {
        return this.router;
    }
}

export const authRoutes = new AuthRoutes();
export default authRoutes.router;
