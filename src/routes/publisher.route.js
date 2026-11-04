import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { PublisherModel } from '../models/publisher.model.js';
import { PublisherService } from '../services/publisher.service.js';
import { PublisherController } from '../controllers/publisher.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createPublisherValidator, updatePublisherValidator, publisherIdParamValidator } from '../validators/publisher.validator.js';

// Ensamblaje / Inyección de dependencias
const publisherModel = new PublisherModel(Database.getPool());
const publisherService = new PublisherService(publisherModel);
const publisherController = new PublisherController(publisherService);
const authMiddleware = new AuthMiddleware();

const publisherRouter = Router();

// Rutas públicas de consulta
publisherRouter.get('/', publisherController.getAll);
publisherRouter.get('/:id', publisherIdParamValidator, validationMiddleware, publisherController.getById);

// Rutas protegidas (Solo administradores)
publisherRouter.post('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, createPublisherValidator, validationMiddleware, publisherController.create);
publisherRouter.put('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, publisherIdParamValidator, updatePublisherValidator, validationMiddleware, publisherController.update);
publisherRouter.delete('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, publisherIdParamValidator, validationMiddleware, publisherController.delete);

export default publisherRouter;
