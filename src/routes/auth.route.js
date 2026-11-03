import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { UserModel } from '../models/user.model.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';

// Ensamblaje / Inyección de dependencias
const userModel = new UserModel(Database.getPool());
const authService = new AuthService(userModel);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

const authRouter = Router();

authRouter.post('/register', registerValidator, validationMiddleware, authController.register);
authRouter.post('/login', loginValidator, validationMiddleware, authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/profile', authMiddleware.requireAuth, authController.getProfile);

export default authRouter;
