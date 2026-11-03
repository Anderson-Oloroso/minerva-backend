export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res, next) => {
        try {
            const newUser = await this.authService.register(req.body);
            res.status(201).json({
                status: 'Succes',
                message: 'Cliente registrado correctamente',
                data: newUser
            });
        } catch (err) {
            next(err);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);

            if (!user) {
                return res.status(401).json({
                    status: 'Fail',
                    message: 'El correo o la contraseña son incorrectos'
                });
            }

            req.session.user = user;

            res.status(200).json({
                status: 'Success',
                message: 'Inicio de sesión exitoso',
                data: user
            });
        } catch (err) {
            next(err);
        }
    };

    logout = async (req, res, next) => {
        try {
            req.session = null;
            res.status(200).json({
                status: 'Success',
                message: 'Sesión cerrada exitosamente'
            });
        } catch (err) {
            next(err);
        }
    };

    getProfile = async (req, res, next) => {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json({
                    status: 'Fail',
                    message: 'No hay sesión activa'
                });
            }

            res.status(200).json({
                status: 'Success',
                data: req.session.user
            });
        } catch (err) {
            next(err);
        }
    };
}

export default AuthController;
