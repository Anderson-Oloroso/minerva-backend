import { body, param } from 'express-validator';

export const createAuthorValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del autor no puede estar vacio')
        .isString().withMessage('El nombre tiene que ser una cadena de texto válido')
        .isLength({ min: 4, max: 50 }).withMessage('El nombre debe tener entre 4 a 50 aracteres')
];

export const updateAuthorValidator = [
    body('name')
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 4, max: 50 }).withMessage('El nombre debe tener entre 4 a 50 aracteres')
];

export const authorIdParamValidator = [
    param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero positivo')
];

export default {
    createAuthorValidator,
    updateAuthorValidator,
    authorIdParamValidator
};
