import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { SaleModel } from '../models/sale.model.js';
import { SaleService } from '../services/sale.service.js';
import { SaleController } from '../controllers/sale.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createSaleValidator, saleIdParamValidator } from '../validators/sale.validator.js';

const saleModel = new SaleModel(Database.getPool());
const saleService = new SaleService(saleModel);
const saleController = new SaleController(saleService);
const authMiddleware = new AuthMiddleware();

const saleRouter = Router();

saleRouter.get('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, saleController.getAll);
saleRouter.get('/me', authMiddleware.requireAuth, saleController.getMine);
saleRouter.post('/', authMiddleware.requireAuth, createSaleValidator, validationMiddleware, saleController.create);
saleRouter.put('/:id/confirm', authMiddleware.requireAuth, authMiddleware.requireAdmin, saleIdParamValidator, validationMiddleware, saleController.confirm);
saleRouter.put('/:id/reject', authMiddleware.requireAuth, authMiddleware.requireAdmin, saleIdParamValidator, validationMiddleware, saleController.reject);

export default saleRouter;