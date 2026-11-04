import { NotFoundError } from '../utils/errors.js';
import { GenreDTO } from '../dtos/genre.dto.js';

export class GenreService {
    constructor(genreModel) {
        this.genreModel = genreModel;
    }

    async getAll() {
        const genres = await this.genreModel.findAll();
        return GenreDTO.fromList(genres);
    }

    async getById(id) {
        const genre = await this.genreModel.findById(id);
        if (!genre) {
            throw new NotFoundError('Genero no encontrado');
        }
        return GenreDTO.from(genre);
    }

    async create(data) {
        const newGenre = await this.genreModel.create({ genre: data.genre });
        return GenreDTO.from(newGenre);
    }

    async update(id, data) {
        const genre = data.genre !== undefined && data.genre.trim() !== '' ? data.genre : null;
        const updatedGenre = await this.genreModel.update(id, { genre });
        if (!updatedGenre) {
            throw new NotFoundError('Genero no encontrado');
        }
        return updatedGenre;
    }

    async delete(id) {
        const deleted = await this.genreModel.delete(id);
        if (!deleted) {
            throw new NotFoundError('Genero no encontrado');
        }
        return true;
    }
}
