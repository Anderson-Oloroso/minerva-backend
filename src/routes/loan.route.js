import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { LoanModel } from '../models/loan.model.js';
import { LoanService } from '../services/loan.service.js';
import { LoanController } from '../controllers/loan.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { createLoanValidator, returnLoanValidator } from '../validators/loan.validator.js';

const loanModel = new LoanModel(Database.getPool());
const loanService = new LoanService(loanModel);
const loanController = new LoanController(loanService);
const authMiddleware = new AuthMiddleware();

const loanRouter = Router();

loanRouter.post('/', authMiddleware.requireAuth, createLoanValidator, validationMiddleware, loanController.create);
loanRouter.put('/:id/return', authMiddleware.requireAuth, returnLoanValidator, validationMiddleware, loanController.returnLoan);

export default loanRouter;
