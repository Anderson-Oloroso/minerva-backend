import { body, param } from 'express-validator';

export class PublisherDTO {
    #name_publisher;

    constructor(data = {}) {
        this.#name_publisher = data.publisher;
    }

    get publisher() { return this.#name_publisher; }

    static get createRules() {
        return [
            body('publisher')
                .trim()
                .notEmpty().withMessage('El nombre de la editorial no puede estar vacío')
                .isString().withMessage('El nombre de la editorial tiene que tener una cadena de texto válida')
                .isLength({ min: 4, max: 50 }).withMessage('El nombre de la editorial tiene que ser mayor a 4 caracteres y menor a 50')
        ];
    }

    static get idRules() {
        return [
            param('id').isInt({ min: 1 }).withMessage('El id de la editorial debe ser un número entero positivo')
        ];
    }
}

export const CreatePublisherDto = PublisherDTO;
export const validationsCreatePublisher = PublisherDTO.createRules;
export const validatePublisherId = PublisherDTO.idRules;
export default PublisherDTO;
