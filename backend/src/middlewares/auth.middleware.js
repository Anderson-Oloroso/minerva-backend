export class AuthMiddleware {
    // Valida el inicio de sesión
    static requireAuth(req, res, next) {
        if (!req.session || !req.session?.user) {
            return res.status(401).send({ error: 'Usuario no autenticado. --> Iniciar Sesión' });
        }
        next();
    }

    // Valida los permisos de la sesión
    static requireAdmin(req, res, next) {
        if (req.session?.user?.role !== 'admin') {
            return res.status(403).json({ err: ' Acceso denegado, se requiere permisos de administrador' });
        }
        next();
    }
}

export const requireAuth = AuthMiddleware.requireAuth;
export const requireAdmin = AuthMiddleware.requireAdmin;
export default AuthMiddleware;
