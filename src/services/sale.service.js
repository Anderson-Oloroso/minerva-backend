import { SaleDTO } from '../dtos/sale.dto.js';

export class SaleService {
    constructor(saleModel) {
        this.saleModel = saleModel;
    }

    async create(data, idUser) {
        const sale = await this.saleModel.create({
            id_user: idUser,
            details: data.details
        });
        return SaleDTO.from(sale);
    }
}