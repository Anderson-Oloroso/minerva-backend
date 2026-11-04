import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwtSecret from './jwt.config.js';
import { Database } from './database.config.js';
import { UserModel } from '../models/user.model.js';
import { UserDTO } from '../dtos/user.dto.js';

const userModel = new UserModel(Database.getPool());

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: ['HS256']
}, async (payload, done) => {
    try {
        if (typeof payload.sub !== 'string') {
            return done(null, false);
        }

        const user = await userModel.findActiveById(payload.sub);
        if (!user) {
            return done(null, false);
        }

        return done(null, UserDTO.from(user));
    } catch (error) {
        return done(error);
    }
}));

export default passport;
