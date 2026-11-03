import { NotFoundError } from '../utils/errors.js';
import PublisherDTO from '../dtos/publisher.dto.js';

export class PublisherService {
    constructor(publisherModel) {
        this.publisherModel = publisherModel;
    }

    async getAll() {
        const publishers = await this.publisherModel.findAll();
        return PublisherDTO.fromList(publishers);
    }

    async getById(id) {
        const publisher = await this.publisherModel.findById(id);
        if (!publisher) {
            throw new NotFoundError('Editorial no encontrada');
        }
        return PublisherDTO.from(publisher);
    }

    async create(data) {
        const newPublisher = await this.publisherModel.create({ publisher: data.publisher });
        return PublisherDTO.from(newPublisher);
    }

    async update(id, data) {
        const publisher = data.publisher !== undefined && data.publisher.trim() !== '' ? data.publisher : null;
        const updatedPublisher = await this.publisherModel.update(id, { publisher });
        if (!updatedPublisher) {
            throw new NotFoundError('Editorial no encontrada');
        }
        return updatedPublisher;
    }

    async delete(id) {
        const deleted = await this.publisherModel.delete(id);
        if (!deleted) {
            throw new NotFoundError('Editorial no encontrada');
        }
        return true;
    }
}

export default PublisherService;
