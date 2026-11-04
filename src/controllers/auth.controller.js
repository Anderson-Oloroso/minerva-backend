import { TokenService } from '../services/token.service.js';

export class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async register(req, res, next) {
        try {
            const newUser = await this.authService.register(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Usuario registrado correctamente',
                data: newUser
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);

            if (!user) {
                return res.status(401).json({
                    status: 'Fail',
                    message: 'El correo o la contraseña son incorrectos'
                });
            }

            const { accessToken, expiresIn } = TokenService.createAccessToken(user);

            res.status(200).json({
                status: 'Success',
                message: 'Inicio de sesión exitoso',
                data: user,
                accessToken,
                tokenType: 'Bearer',
                expiresIn
            });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            res.status(200).json({
                status: 'Success',
                message: 'Elimina el token de acceso del usuario para cerrar sesión.'
            });
        } catch (err) {
            next(err);
        }
    }
}
