export class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
        this.create = this.create.bind(this);
        this.returnLoan = this.returnLoan.bind(this);
    }

    async create(req, res, next) {
        try {
            const loan = await this.loanService.create(req.body, req.user.id_user);
            res.status(201).json({
                status: 'Success',
                message: 'Préstamo creado correctamente',
                data: loan
            });
        } catch (err) {
            next(err);
        }
    }

    async returnLoan(req, res, next) {
        try {
            const loan = await this.loanService.returnLoan(req.params.id, req.body.details, req.user.id_user);
            res.status(200).json({
                status: 'Success',
                message: 'Préstamo devuelto correctamente',
                data: loan
            });
        } catch (err) {
            next(err);
        }
    }
}
