export class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getMe = this.getMe.bind(this);
        this.create = this.create.bind(this);
        this.updateById = this.updateById.bind(this);
        this.updateMe = this.updateMe.bind(this);
        this.deactivateById = this.deactivateById.bind(this);
        this.deactivateMe = this.deactivateMe.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const users = await this.userService.getAll();
            res.status(200).json({
                status: 'Success',
                total: users.length,
                data: users
            });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await this.userService.getById(req.params.id);
            res.status(200).json({ status: 'Success', data: user });
        } catch (err) {
            next(err);
        }
    }

    async getMe(req, res, next) {
        try {
            const user = await this.userService.getById(req.user.id_user);
            res.status(200).json({ status: 'Success', data: user });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Usuario creado correctamente',
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    async updateById(req, res, next) {
        try {
            const user = await this.userService.update(req.params.id, req.body, { isAdmin: true });
            res.status(200).json({
                status: 'Success',
                message: 'Usuario actualizado correctamente',
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    async updateMe(req, res, next) {
        try {
            const user = await this.userService.update(req.user.id_user, req.body);
            res.status(200).json({
                status: 'Success',
                message: 'Perfil actualizado correctamente',
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    async deactivateById(req, res, next) {
        try {
            await this.userService.deactivate(req.params.id);
            res.status(200).json({
                status: 'Success',
                message: 'Usuario desactivado correctamente'
            });
        } catch (err) {
            next(err);
        }
    }

    async deactivateMe(req, res, next) {
        try {
            await this.userService.deactivate(req.user.id_user);
            res.status(200).json({
                status: 'Success',
                message: 'Tu cuenta fue desactivada correctamente'
            });
        } catch (err) {
            next(err);
        }
    }
}
