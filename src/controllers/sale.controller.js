export class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
        this.create = this.create.bind(this);
    }

    async create(req, res, next) {
        try {
            const sale = await this.saleService.create(req.body, req.user.id);
            res.status(201).json({
                status: 'Success',
                message: 'Venta creada correctamente',
                data: sale
            });
        } catch (err) {
            next(err);
        }
    }
}