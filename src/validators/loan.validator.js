import { body, param } from 'express-validator';

const states = ['Excelente', 'Regular', 'Maltratado'];

const isPositiveDatabaseInteger = value =>
    Number.isSafeInteger(value) && value > 0 && value <= 2147483647;

export const createLoanValidator = [
    body('expected_return_date')
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('La fecha de devolución esperada debe ser una fecha y hora ISO 8601 válida')
        .bail()
        .custom(value => new Date(value).getTime() > Date.now())
        .withMessage('La fecha de devolución esperada debe ser futura'),
    body('details')
        .isArray({ min: 1 }).withMessage('El préstamo debe incluir al menos un libro')
        .bail()
        .custom(details => details.every(detail =>
            detail !== null &&
            typeof detail === 'object' &&
            !Array.isArray(detail) &&
            isPositiveDatabaseInteger(detail.id_book) &&
            states.includes(detail.state_book_out)
        ))
        .withMessage('Cada detalle debe incluir id_book válido y state_book_out permitido')
];

export const returnLoanValidator = [
    param('id')
        .isInt({ min: 1, max: 2147483647 })
        .withMessage('El ID del préstamo debe ser un entero positivo'),
    body('details')
        .isArray({ min: 1 }).withMessage('La devolución debe incluir los detalles del préstamo')
        .bail()
        .custom(details => details.every(detail =>
            detail !== null &&
            typeof detail === 'object' &&
            !Array.isArray(detail) &&
            isPositiveDatabaseInteger(detail.id_loan_detail) &&
            states.includes(detail.state_book_in)
        ))
        .withMessage('Cada detalle debe incluir id_loan_detail válido y state_book_in permitido')
];

export default { createLoanValidator, returnLoanValidator };
