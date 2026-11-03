import { Router } from 'express';
import Database from '../config/database.config.js';
import GenreModel from '../models/genre.model.js';
import GenreService from '../services/genre.service.js';
import GenreController from '../controllers/genre.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createGenreValidator, updateGenreValidator, genreIdParamValidator } from '../validators/genre.validator.js';

// Ensamblaje / Inyección de dependencias
const genreModel = new GenreModel(Database.getPool());
const genreService = new GenreService(genreModel);
const genreController = new GenreController(genreService);
const authMiddleware = new AuthMiddleware();

const genreRouter = Router();

// Rutas públicas de consulta
genreRouter.get('/', genreController.getAll);
genreRouter.get('/:id', genreIdParamValidator, validationMiddleware, genreController.getById);

// Rutas protegidas (Solo administradores)
genreRouter.post('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, createGenreValidator, validationMiddleware, genreController.create);
genreRouter.put('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, genreIdParamValidator, updateGenreValidator, validationMiddleware, genreController.update);
genreRouter.delete('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, genreIdParamValidator, validationMiddleware, genreController.delete);

export default genreRouter;
