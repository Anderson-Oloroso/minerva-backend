import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { BookModel } from '../models/book.model.js';
import { BookService } from '../services/book.service.js';
import { BookController } from '../controllers/book.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createBookValidator, updateBookValidator, bookIdParamValidator } from '../validators/book.validator.js';

// Ensamblaje / Inyección de dependencias
const bookModel = new BookModel(Database.getPool());
const bookService = new BookService(bookModel);
const bookController = new BookController(bookService);
const authMiddleware = new AuthMiddleware();

const bookRouter = Router();

// Rutas públicas de consulta
bookRouter.get('/', bookController.getAll);
bookRouter.get('/:id', bookIdParamValidator, validationMiddleware, bookController.getById);

// Rutas protegidas (Solo administradores)
bookRouter.post('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, createBookValidator, validationMiddleware, bookController.create);
bookRouter.put('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, bookIdParamValidator, updateBookValidator, validationMiddleware, bookController.update);
bookRouter.delete('/:id', authMiddleware.requireAuth, authMiddleware.requireAdmin, bookIdParamValidator, validationMiddleware, bookController.delete);

export default bookRouter;