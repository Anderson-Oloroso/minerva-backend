import { body } from 'express-validator';

const isPositiveDatabaseInteger = value =>
    Number.isSafeInteger(value) && value > 0 && value <= 2147483647;

export const createSaleValidator = [
    body('details')
        .isArray({ min: 1 }).withMessage('La venta debe incluir al menos un libro')
        .bail()
        .custom(details => details.every(detail =>
            detail !== null &&
            typeof detail === 'object' &&
            !Array.isArray(detail) &&
            isPositiveDatabaseInteger(detail.id_book) &&
            isPositiveDatabaseInteger(detail.amount)
        ))
        .withMessage('Cada detalle debe incluir id_book y amount como enteros positivos')
];

export default { createSaleValidator };