import { Router } from 'express';
import Database from '../config/database.config.js';
import AuthorModel from '../models/author.model.js';
import AuthorService from '../services/author.service.js';
import AuthorController from '../controllers/author.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createAuthorValidator, updateAuthorValidator, authorIdParamValidator } from '../validators/author.validator.js';

// Ensamblaje / Inyección de dependencias
const authorModel = new AuthorModel(Database.getPool());
const authorService = new AuthorService(authorModel);
const authorController = new AuthorController(authorService);
const authMiddleware = new AuthMiddleware();

const authorRouter = Router();

// Rutas públicas de consulta
authorRouter.get('/', authorController.getAll);
authorRouter.get('/:id', authorIdParamValidator, validationMiddleware, authorController.getById);

// Rutas de administración
authorRouter.post('/', createAuthorValidator, validationMiddleware, authorController.create);
authorRouter.put('/:id', authorIdParamValidator, updateAuthorValidator, validationMiddleware, authorController.update);
authorRouter.delete('/:id', authorIdParamValidator, validationMiddleware, authorController.delete);

export default authorRouter;
