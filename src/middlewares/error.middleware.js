export class ErrorMiddleware {
    static handle(err, req, res, next) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            mensaje: err.message || 'Error interno del servidor',
            errores: err.details || null
        });
    }
}

export const errorHandler = ErrorMiddleware.handle;
export default ErrorMiddleware;
