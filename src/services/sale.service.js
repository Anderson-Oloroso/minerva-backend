import { SaleDTO } from '../dtos/sale.dto.js';

export class SaleService {
    constructor(saleModel) {
        this.saleModel = saleModel;
    }

    async getAll() {
        return SaleDTO.fromList(await this.saleModel.findAll());
    }

    async getMine(idUser) {
        return SaleDTO.fromList(await this.saleModel.findAllByUserId(idUser));
    }

    async create(data, idUser) {
        const sale = await this.saleModel.create({
            id_user: idUser,
            details: data.details
        });
        return SaleDTO.from(sale);
    }

    async confirm(id) {
        return SaleDTO.from(await this.saleModel.confirm(id));
    }

    async reject(id) {
        return SaleDTO.from(await this.saleModel.reject(id));
    }
}