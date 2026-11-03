export class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const genres = await this.genreService.getAll();
            if (!genres || genres.length === 0) {
                return res.status(200).json({
                    status: 'Success',
                    total: 0,
                    message: 'Aun no hay Generos en la base de datos'
                });
            }

            res.status(200).json({
                status: 'Success',
                total: genres.length,
                message: 'Generos en la base de datos',
                data: genres
            });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const genre = await this.genreService.getById(id);
            res.status(200).json({
                status: 'Success',
                data: genre
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newGenre = await this.genreService.create(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Genero creado correctamente',
                data: newGenre
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedGenre = await this.genreService.update(id, req.body);
            res.status(200).json({
                status: 'Success',
                message: 'Genero actualizado correctamente',
                data: updatedGenre
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.genreService.delete(id);
            res.status(200).json({
                status: 'Success',
                message: 'Genero eliminado exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }
}

export default GenreController;
