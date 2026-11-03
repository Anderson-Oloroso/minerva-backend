import { AuthorService } from '../services/authors.service.js';
import { AuthorDTO } from '../dtos/authors.dto.js';

export class AuthorController {
    static async create(req, res, next) {
        try {
            const authorDTO = new AuthorDTO(req.body);
            const newAuthor = await AuthorService.create({ name_author: authorDTO.name });

            res.status(201).json({
                status: 'Success',
                message: 'Autor creado exitosamente',
                data: newAuthor
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(req, res, next) {
        try {
            const authors = await AuthorService.list();
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

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const newData = new AuthorDTO(req.body);
            const updatedAuthor = await AuthorService.update(
                { name_author: newData.name.trim() === '' ? null : newData.name },
                id
            );

            if (!updatedAuthor) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Autor no encontrado'
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Editorial modificada correctamente',
                data: updatedAuthor
            });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedAuthor = await AuthorService.delete(id);
            if (!deletedAuthor) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Autor no encontrado'
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Autor eliminado exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }
}

export const createAuthor = AuthorController.create;
export const getAuthors = AuthorController.list;
export const updateAuthor = AuthorController.update;
export const deleteAuthor = AuthorController.delete;
export default AuthorController;
