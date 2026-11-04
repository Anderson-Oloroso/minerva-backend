import { NotFoundError } from '../utils/errors.js';
import { LoanDTO } from '../dtos/loan.dto.js';

export class LoanService {
    constructor(loanModel) {
        this.loanModel = loanModel;
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

    async returnLoan(id, details, idUser) {
        const loan = await this.loanModel.returnLoan(id, details, idUser);
        if (!loan) {
            throw new NotFoundError('Préstamo no encontrado');
        }
        return LoanDTO.from(loan);
    }
}
