import { body, param } from 'express-validator';

export const createBookValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('El título del libro es obligatorio')
        .isLength({ max: 50 }).withMessage('El título no puede superar los 50 caracteres'),

    body('isbn')
        .trim()
        .notEmpty().withMessage('El ISBN es obligatorio')
        .isISBN().withMessage('El ISBN debe ser válido'),

    body('year_publication')
        .isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('El año de publicación debe ser un entero positivo válido'),

    body('no_pages')
        .isInt({ min: 1 }).withMessage('El número de páginas debe ser un entero mayor que cero'),

    body('wrote_language')
        .trim()
        .notEmpty().withMessage('El idioma del libro es obligatorio')
        .isLength({ max: 50 }).withMessage('El idioma no puede superar los 50 caracteres'),

    body('price')
        .isFloat({ min: 0, max: 9999.99 }).withMessage('El precio debe ser un número entre 0 y 9999.99'),

    body('stock')
        .isInt({ min: 0 }).withMessage('El stock debe ser un entero mayor o igual a cero'),

    body('id_genre')
        .isInt({ min: 1 }).withMessage('El género debe ser un ID entero positivo'),

    body('id_author')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('El autor debe ser un ID entero positivo'),

    body('id_publisher')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('La editorial debe ser un ID entero positivo')
];

export const updateBookValidator = [
    body('title')
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('El título debe tener entre 1 y 50 caracteres'),

    body('isbn')
        .optional({ nullable: true })
        .trim()
        .isISBN().withMessage('El ISBN debe ser válido'),

    body('year_publication')
        .optional({ nullable: true })
        .isInt({ min: 1, max: 65535 }).withMessage('El año de publicación debe ser un entero positivo válido'),

    body('no_pages')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('El número de páginas debe ser un entero mayor que cero'),

    body('wrote_language')
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('El idioma debe tener entre 1 y 50 caracteres'),

    body('price')
        .optional({ nullable: true })
        .isFloat({ min: 0, max: 9999.99 }).withMessage('El precio debe ser un número entre 0 y 9999.99'),

    body('stock')
        .optional({ nullable: true })
        .isInt({ min: 0 }).withMessage('El stock debe ser un entero mayor o igual a cero'),

    body('id_genre')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('El género debe ser un ID entero positivo'),

    body('id_author')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('El autor debe ser un ID entero positivo'),

    body('id_publisher')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('La editorial debe ser un ID entero positivo')
];

export const bookIdParamValidator = [
    param('id').isInt({ min: 1 }).withMessage('El ID del libro debe ser un entero positivo')
];

export default {
    createBookValidator,
    updateBookValidator,
    bookIdParamValidator
};