export class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
        this.getMine = this.getMine.bind(this);
        this.create = this.create.bind(this);
        this.returnLoan = this.returnLoan.bind(this);
    }

    async getMine(req, res, next) {
        try {
            const loans = await this.loanService.getMine(req.user.id_user);
            res.status(200).json({
                status: 'Success',
                total: loans.length,
                message: 'Préstamos del usuario',
                data: loans
            });
        } catch (err) {
            next(err);
        }
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
