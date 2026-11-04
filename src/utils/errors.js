export class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Usuario no autenticado. --> Iniciar Sesión') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Acceso denegado, se requiere permisos de administrador') {
        super(message, 403);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Errores de validación', details = null) {
        super(message, 400, details);
    }
}
