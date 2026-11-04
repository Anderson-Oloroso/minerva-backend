import { NotFoundError } from '../utils/errors.js';
import { LoanDTO } from '../dtos/loan.dto.js';

export class LoanService {
    constructor(loanModel) {
        this.loanModel = loanModel;
    }

    async getAll() {
        return LoanDTO.fromList(await this.loanModel.findAll());
    }

    async getMine(idUser) {
        return LoanDTO.fromList(await this.loanModel.findAllByUserId(idUser));
    }

    async create(data, idUser) {
        const loan = await this.loanModel.create({
            id_user: idUser,
            expected_return_date: data.expected_return_date,
            details: data.details
        });
        return LoanDTO.from(loan);
    }

    async approve(id, details) {
        return LoanDTO.from(await this.loanModel.approve(id, details));
    }

    async requestReturn(id, idUser) {
        return LoanDTO.from(await this.loanModel.requestReturn(id, idUser));
    }

    async reject(id) {
        return LoanDTO.from(await this.loanModel.reject(id));
    }

    async returnLoan(id, details) {
        const loan = await this.loanModel.returnLoan(id, details);
        if (!loan) {
            throw new NotFoundError('Préstamo no encontrado');
        }
        return LoanDTO.from(loan);
    }
}
