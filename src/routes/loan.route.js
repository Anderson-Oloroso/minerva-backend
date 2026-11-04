import { Router } from 'express';
import { Database } from '../config/database.config.js';
import { LoanModel } from '../models/loan.model.js';
import { LoanService } from '../services/loan.service.js';
import { LoanController } from '../controllers/loan.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { approveLoanValidator, createLoanValidator, loanIdParamValidator, requestLoanReturnValidator, returnLoanValidator } from '../validators/loan.validator.js';

const loanModel = new LoanModel(Database.getPool());
const loanService = new LoanService(loanModel);
const loanController = new LoanController(loanService);
const authMiddleware = new AuthMiddleware();

const loanRouter = Router();

loanRouter.get('/', authMiddleware.requireAuth, authMiddleware.requireAdmin, loanController.getAll);
loanRouter.get('/me', authMiddleware.requireAuth, loanController.getMine);
loanRouter.post('/', authMiddleware.requireAuth, createLoanValidator, validationMiddleware, loanController.create);
loanRouter.put('/:id/approve', authMiddleware.requireAuth, authMiddleware.requireAdmin, approveLoanValidator, validationMiddleware, loanController.approve);
loanRouter.put('/:id/reject', authMiddleware.requireAuth, authMiddleware.requireAdmin, loanIdParamValidator, validationMiddleware, loanController.reject);
loanRouter.put('/:id/return-request', authMiddleware.requireAuth, requestLoanReturnValidator, validationMiddleware, loanController.requestReturn);
loanRouter.put('/:id/return', authMiddleware.requireAuth, authMiddleware.requireAdmin, returnLoanValidator, validationMiddleware, loanController.returnLoan);

export default loanRouter;
