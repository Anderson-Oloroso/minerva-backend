import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { UserModel } from '../models/user.model.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createUserValidator, updateOwnUserValidator, updateUserValidator, userIdParamValidator } from '../validators/user.validator.js';

const userModel = new UserModel(Database.getPool());
const userService = new UserService(userModel);
const userController = new UserController(userService);
const authMiddleware = new AuthMiddleware();

const userRouter = Router();

userRouter.get('/me', authMiddleware.requireAuth, userController.getMe);
userRouter.put('/me', authMiddleware.requireAuth, updateOwnUserValidator, validationMiddleware, userController.updateMe);
userRouter.delete('/me', authMiddleware.requireAuth, userController.deactivateMe);

userRouter.get('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, userController.getAll);
userRouter.post('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, createUserValidator, validationMiddleware, userController.create);
userRouter.get('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, userIdParamValidator, validationMiddleware, userController.getById);
userRouter.put('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, updateUserValidator, validationMiddleware, userController.updateById);
userRouter.delete('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, userIdParamValidator, validationMiddleware, userController.deactivateById);

export default userRouter;
