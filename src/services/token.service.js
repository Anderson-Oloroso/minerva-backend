import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.config.js';

const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

export class TokenService {
    static createAccessToken(user) {
        const accessToken = jwt.sign(
            { role: user.role },
            jwtSecret,
            {
                algorithm: 'HS256',
                subject: String(user.id_user),
                expiresIn: jwtExpiresIn
            }
        );

        const payload = jwt.decode(accessToken);
        if (!payload || typeof payload === 'string' || typeof payload.iat !== 'number' || typeof payload.exp !== 'number') {
            throw new Error('Unable to determine the access token expiration.');
        }

        return {
            accessToken,
            expiresIn: payload.exp - payload.iat
        };
    }
}
