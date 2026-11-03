import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/errors.js';

export class ValidationMiddleware {
    validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new ValidationError('Errores de validación', errors.array());
            return next(err);
        }
        next();
    };

    static handle(req, res, next) {
        return new ValidationMiddleware().validate(req, res, next);
    }
}

export const validationMiddleware = (req, res, next) => ValidationMiddleware.handle(req, res, next);
export const managerValidationErrors = validationMiddleware;
export default validationMiddleware;
