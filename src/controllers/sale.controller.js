export class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
        this.getAll = this.getAll.bind(this);
        this.getMine = this.getMine.bind(this);
        this.create = this.create.bind(this);
        this.confirm = this.confirm.bind(this);
        this.reject = this.reject.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const sales = await this.saleService.getAll();
            res.status(200).json({
                status: 'Success',
                total: sales.length,
                message: 'Ventas registradas',
                data: sales
            });
        } catch (err) {
            next(err);
        }
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

    async confirm(req, res, next) {
        try {
            const sale = await this.saleService.confirm(req.params.id);
            res.status(200).json({ status: 'Success', message: 'Pago confirmado y venta registrada', data: sale });
        } catch (err) {
            next(err);
        }
    }

    async reject(req, res, next) {
        try {
            const sale = await this.saleService.reject(req.params.id);
            res.status(200).json({ status: 'Success', message: 'Solicitud de compra rechazada', data: sale });
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