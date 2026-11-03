export class PublisherController {
    constructor(publisherService) {
        this.publisherService = publisherService;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const publishers = await this.publisherService.getAll();
            if (!publishers || publishers.length === 0) {
                return res.status(200).json({
                    status: 'Success',
                    total: 0,
                    message: 'Aun no hay editoriales en la base de datos'
                });
            }

            res.status(200).json({
                status: 'Success',
                total: publishers.length,
                message: 'Editoriales en la base de datos',
                data: publishers
            });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const publisher = await this.publisherService.getById(id);
            res.status(200).json({
                status: 'Success',
                data: publisher
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newPublisher = await this.publisherService.create(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Editorial creada correctamente',
                data: newPublisher
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedPublisher = await this.publisherService.update(id, req.body);
            res.status(200).json({
                status: 'Success',
                message: 'Editorial actualizada correctamente',
                data: updatedPublisher
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.publisherService.delete(id);
            res.status(200).json({
                status: 'Success',
                message: 'Editorial eliminada exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }
}

export default PublisherController;
