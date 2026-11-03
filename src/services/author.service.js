import { NotFoundError } from '../utils/errors.js';
import { AuthorDTO } from '../dtos/author.dto.js';

export class AuthorService {
    constructor(authorModel) {
        this.authorModel = authorModel;
    }

    async getAll() {
        const authors = await this.authorModel.findAll();
        return AuthorDTO.fromList(authors);
    }

    async getById(id) {
        const author = await this.authorModel.findById(id);
        if (!author) {
            throw new NotFoundError('Autor no encontrado');
        }
        return AuthorDTO.from(author);
    }

    async create(data) {
        const newAuthor = await this.authorModel.create({ name_author: data.name });
        return AuthorDTO.from(newAuthor);
    }

    async update(id, data) {
        const name = data.name !== undefined && data.name.trim() !== '' ? data.name : null;
        const updatedAuthor = await this.authorModel.update(id, { name_author: name });
        if (!updatedAuthor) {
            throw new NotFoundError('Autor no encontrado');
        }
        return updatedAuthor;
    }

    async delete(id) {
        const deleted = await this.authorModel.delete(id);
        if (!deleted) {
            throw new NotFoundError('Autor no encontrado');
        }
        return true;
    }
}
