import { NotFoundError } from '../errors/not-found.error.js';
import { BookDTO } from '../dtos/book.dto.js';

export class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    
    async getAll() {
        const books = await this.bookModel.findAll();
        return BookDTO.fromList(books);
    }

    async getById(id) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundError('Libro no encontrado');
        } 
        return BookDTO.from(book);
    }

    async create(data) {
        const newBook = await this.bookModel.create(data);
        return BookDTO.from(newBook);
    }

    async update(id, data) {
        const updatedBook = await this.bookModel.update(id, data);
        if (!updatedBook) {
            throw new NotFoundError('Libro no encontrado');
        }
        return BookDTO.from(updatedBook);
    }
}