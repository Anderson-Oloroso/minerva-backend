import { NotFoundError } from '../utils/errors.js';
import { LoanDTO } from '../dtos/loan.dto.js';

export class LoanService {
    constructor(loanModel) {
        this.loanModel = loanModel;
    }

    async create(data, idClient) {
        const loan = await this.loanModel.create({
            id_client: idClient,
            expected_return_date: data.expected_return_date,
            details: data.details
        });
        return LoanDTO.from(loan);
    }

    async returnLoan(id, details, idClient) {
        const loan = await this.loanModel.returnLoan(id, details, idClient);
        if (!loan) {
            throw new NotFoundError('Préstamo no encontrado');
        }
        return LoanDTO.from(loan);
    }
}
