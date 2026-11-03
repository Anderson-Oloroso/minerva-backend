import bcrypt from 'bcrypt';
import UserDTO from '../dtos/user.dto.js';

export class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async register(data) {
        const salt = 10;
        const hashedPssw = await bcrypt.hash(data.password, salt);
        const defaultRole = 'client';

        const user = await this.userModel.create({
            doc: data.dpi,
            name: data.name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            password: hashedPssw,
            role: defaultRole
        });

        return UserDTO.from(user);
    }

    async login(email, password) {
        const user = await this.userModel.findByEmail(email);
        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return null;
        }

        return UserDTO.from(user);
    }

    async getProfile(userId) {
        const user = await this.userModel.findById(userId);
        return UserDTO.from(user);
    }
}

export default AuthService;
