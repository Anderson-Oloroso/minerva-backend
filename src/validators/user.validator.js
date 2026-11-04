import { body, param } from 'express-validator';

const userFields = ['dpi', 'name_user', 'last_name', 'phone', 'email', 'password'];
const adminFields = [...userFields, 'role', 'is_active'];

const allowedFields = fields => body().custom((value) =>
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0 &&
    Object.keys(value).every(field => fields.includes(field))
).withMessage('El cuerpo debe incluir campos permitidos para esta operación');

const profileFields = [
    body('dpi')
        .optional()
        .matches(/^\d{13}$/).withMessage('El DPI debe tener exactamente 13 dígitos'),
    body('name_user')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('last_name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('phone')
        .optional()
        .matches(/^\d{8}$/).withMessage('El teléfono debe tener exactamente 8 dígitos'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
];

export const createUserValidator = [
    allowedFields([...userFields, 'role']),
    body('dpi')
        .matches(/^\d{13}$/).withMessage('El DPI debe tener exactamente 13 dígitos'),
    body('name_user')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('last_name')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('phone')
        .matches(/^\d{8}$/).withMessage('El teléfono debe tener exactamente 8 dígitos'),
    body('email')
        .trim()
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('El rol debe ser user o admin')
];

export const updateOwnUserValidator = [
    allowedFields(userFields),
    ...profileFields
];

export const updateUserValidator = [
    param('id').isInt({ min: 1, max: 2147483647 }).withMessage('El ID debe ser un entero positivo'),
    allowedFields(adminFields),
    ...profileFields,
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('El rol debe ser user o admin'),
    body('is_active')
        .optional()
        .isBoolean().withMessage('is_active debe ser booleano')
        .toBoolean()
];

export const userIdParamValidator = [
    param('id').isInt({ min: 1, max: 2147483647 }).withMessage('El ID debe ser un entero positivo')
];

export default {
    createUserValidator,
    updateOwnUserValidator,
    updateUserValidator,
    userIdParamValidator
};
