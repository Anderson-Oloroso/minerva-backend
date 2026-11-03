import { PublisherDTO } from '../dtos/publishers.dto.js';
import { PublisherService } from '../services/publishers.service.js';

export class PublisherController {
    static async create(req, res, next) {
        try {
            const publisherDto = new PublisherDTO(req.body);
            const newPublisher = await PublisherService.create({ publisher: publisherDto.publisher });

            res.status(201).json({
                status: 'Success',
                message: 'Editorial creada correctamente',
                data: newPublisher
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(req, res, next) {
        try {
            const publishers = await PublisherService.list();

            if (!publishers || publishers === 0 || publishers.length === 0) {
                return res.status(200).json({
                    status: 'Success',
                    total: 0,
                    message: 'Aun no hay editoriales en la base de datos',
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

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const newPublisher = new PublisherDTO(req.body);
            const updatedPublisher = await PublisherService.update(
                { publisher: newPublisher.publisher.trim() !== '' ? newPublisher.publisher : null },
                id
            );

            if (!updatedPublisher) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Editorial no encontrada'
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Editorial actualizada correctamente',
                data: updatedPublisher
            });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPublisher = await PublisherService.delete(id);

            if (!deletedPublisher) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'El id no ha sido encontrado'
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Editorial eliminada exitosamente'
            });
        } catch (err) {
            next(err);
        }
    }
}

export const createPublisher = PublisherController.create;
export const listPublishers = PublisherController.list;
export const updatePublisher = PublisherController.update;
export const deletePublisher = PublisherController.delete;
export default PublisherController;
