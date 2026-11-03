import { body, param } from 'express-validator';

export const createGenreValidator = [
    body('genre')
        .trim()
        .notEmpty().withMessage('El nombre el genero no puede estar vacío')
        .isString().withMessage('El nombre el genero tiene que tener una cadena de texto válida')
        .isLength({ min: 4, max: 50 }).withMessage('El nombre el genero tiene que ser mayor a 4 caracteres y menor a 50')
];

export const updateGenreValidator = [
    body('genre')
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 4, max: 50 }).withMessage('El nombre el genero tiene que ser mayor a 4 caracteres y menor a 50')
];

export const genreIdParamValidator = [
    param('id').isInt({ min: 1 }).withMessage('El id de el género debe ser un número entero positivo')
];

export default {
    createGenreValidator,
    updateGenreValidator,
    genreIdParamValidator
};
