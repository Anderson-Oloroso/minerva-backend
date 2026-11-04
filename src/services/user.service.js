import bcrypt from 'bcrypt';
import { NotFoundError } from '../utils/errors.js';
import { UserDTO } from '../dtos/user.dto.js';

export class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getAll() {
        return UserDTO.fromList(await this.userModel.findAll());
    }

    async getById(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }
        return UserDTO.from(user);
    }

    async create(data) {
        const user = await this.userModel.create({
            ...data,
            password: await bcrypt.hash(data.password, 10)
        });
        return UserDTO.from(user);
    }

    async update(id, data, { isAdmin = false } = {}) {
        const updates = { ...data };
        if (updates.password !== undefined) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        if (!isAdmin) {
            delete updates.role;
            delete updates.is_active;
        }

        const user = await this.userModel.update(id, updates);
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }
        return UserDTO.from(user);
    }

    async deactivate(id) {
        if (!await this.userModel.deactivate(id)) {
            throw new NotFoundError('Usuario no encontrado o ya inactivo');
        }
    }
}
