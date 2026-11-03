export class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const authors = await this.authorService.getAll();
            res.status(200).json({
                status: 'Success',
                total: authors.length,
                message: 'Autores en la base de datos',
                data: authors
            });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const author = await this.authorService.getById(id);
            res.status(200).json({
                status: 'Success',
                data: author
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newAuthor = await this.authorService.create(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Autor creado exitosamente',
                data: newAuthor
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedAuthor = await this.authorService.update(id, req.body);
            res.status(200).json({
                status: 'Success',
                message: 'Editorial modificada correctamente',
                data: updatedAuthor
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.authorService.delete(id);
            res.status(200).json({
                status: 'Success',
                message: 'Autor eliminado exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }
}

export default AuthorController;
