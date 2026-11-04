export class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const books = await this.bookService.getAll();
            res.status(200).json({
                status: 'Success',
                total: books.length,
                message: 'Libros en la base de datos',
                data: books
            });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const book = await this.bookService.getById(req.params.id);
            res.status(200).json({
                status: 'Success',
                data: book
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newBook = await this.bookService.create(req.body);
            res.status(201).json({
                status: 'Success',
                message: 'Libro creado correctamente',
                data: newBook
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updatedBook = await this.bookService.update(req.params.id, req.body);
            res.status(200).json({
                status: 'Success',
                message: 'Libro actualizado correctamente',
                data: updatedBook
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await this.bookService.delete(req.params.id);
            res.status(200).json({
                status: 'Success',
                message: 'Libro eliminado correctamente'
            });
        } catch (err) {
            next(err);
        }
    }
}