import { body, param } from 'express-validator';

export const createPublisherValidator = [
    body('publisher')
        .trim()
        .notEmpty().withMessage('El nombre de la editorial no puede estar vacío')
        .isString().withMessage('El nombre de la editorial tiene que tener una cadena de texto válida')
        .isLength({ min: 4, max: 50 }).withMessage('El nombre de la editorial tiene que ser mayor a 4 caracteres y menor a 50')
];

export const updatePublisherValidator = [
    body('publisher')
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 4, max: 50 }).withMessage('El nombre de la editorial tiene que ser mayor a 4 caracteres y menor a 50')
];

export const publisherIdParamValidator = [
    param('id').isInt({ min: 1 }).withMessage('El id de la editorial debe ser un número entero positivo')
];

export default {
    createPublisherValidator,
    updatePublisherValidator,
    publisherIdParamValidator
};
