import { SaleDTO } from '../dtos/sale.dto.js';

export class SaleService {
    constructor(saleModel) {
        this.saleModel = saleModel;
    }

    async create(data, idClient) {
        const sale = await this.saleModel.create({
            id_client: idClient,
            details: data.details
        });
        return SaleDTO.from(sale);
    }
}