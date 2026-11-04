export class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
        this.getMine = this.getMine.bind(this);
        this.create = this.create.bind(this);
    }

    async getMine(req, res, next) {
        try {
            const sales = await this.saleService.getMine(req.user.id_user);
            res.status(200).json({
                status: 'Success',
                total: sales.length,
                message: 'Ventas del usuario',
                data: sales
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const sale = await this.saleService.create(req.body, req.user.id_user);
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