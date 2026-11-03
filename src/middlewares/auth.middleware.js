import passport from '../config/passport.js';

export class AuthMiddleware {
    requireAuth = (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: 'Token no válido o no proporcionado.' });
            }

            req.user = user;
            return next();
        })(req, res, next);
    };

    requireAdmin = (req, res, next) => {
        if (req.user?.role !== 'admin') {
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
