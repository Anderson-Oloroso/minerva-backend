import { AuthService } from '../services/auth.service.js';
import { AuthDTO } from '../dtos/auth.dto.js';

export class AuthController {
    // Registrar -- Como una funcionalidad o modificacion directa, cambiar el nombre de clients en todo y cambiarlo a users
    static async register(req, res, next) {
        try {
            const authDto = new AuthDTO(req.body);
            const newUser = await AuthService.register({
                doc: authDto.doc,
                name: authDto.name,
                last_name: authDto.last_name,
                phone: authDto.phone,
                email: authDto.email,
                password: authDto.password
            });

            res.status(201).json({
                status: 'Succes',
                message: 'Cliente registrado correctamente',
                data: newUser
            });
        } catch (err) {
            next(err);
        }
    }

    // Login
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);

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
    }

    // Logout
    static async logout(req, res, next) {
        try {
            req.session = null;
            res.status(200).json({
                status: 'Success',
                message: 'Sesión cerrada exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }

    // Verificar sesión
    static async getProfile(req, res, next) {
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
    }
}

export const register = AuthController.register;
export const login = AuthController.login;
export const logout = AuthController.logout;
export const getProfile = AuthController.getProfile;
export default AuthController;
