export class AuthMiddleware {
    requireAuth = (req, res, next) => {
        if (!req.session || !req.session?.user) {
            return res.status(401).json({ error: 'Usuario no autenticado. --> Iniciar Sesión' });
        }
        next();
    };

    requireAdmin = (req, res, next) => {
        if (req.session?.user?.role !== 'admin') {
            return res.status(403).json({ err: ' Acceso denegado, se requiere permisos de administrador' });
        }
        next();
    };

    static requireAuth(req, res, next) {
        return new AuthMiddleware().requireAuth(req, res, next);
    }

    static requireAdmin(req, res, next) {
        return new AuthMiddleware().requireAdmin(req, res, next);
    }
}

export const requireAuth = AuthMiddleware.requireAuth;
export const requireAdmin = AuthMiddleware.requireAdmin;
export default AuthMiddleware;
