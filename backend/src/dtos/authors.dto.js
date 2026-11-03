import { body, param } from 'express-validator';

export class AuthorDTO {
    #name_author; // Propiedad privada de la clase

    constructor(data = {}) {
        this.#name_author = data.name; // Prepara el objeto listo para usar
    }

    set name(data) { this.#name_author = data; } // Permite cambiar el valor a la variable
    get name() { return this.#name_author; } // Permite leer el dato de forma natural

    static get createRules() {
        return [
            body('name')
                .trim()
                .notEmpty().withMessage('El nombre del autor no puede estar vacio')
                .isString().withMessage('El nombre tiene que ser una cadena de texto válido')
                .isLength({ min: 4, max: 50 }).withMessage('El nombre debe tener entre 4 a 50 aracteres')
        ];
    }

    static get idRules() {
        return [
            param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero positivo')
        ];
    }
}

export const createAuthorDTO = AuthorDTO;
export const validationsCreateAuthor = AuthorDTO.createRules;
export const validateId = AuthorDTO.idRules;
export default AuthorDTO;
