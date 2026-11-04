export class SaleDetailDTO {
    constructor(data = {}) {
        this.id_sale_detail = data.id_sale_detail !== undefined ? Number(data.id_sale_detail) : undefined;
        this.id_book = data.id_book !== undefined ? Number(data.id_book) : undefined;
        this.amount = data.amount !== undefined ? Number(data.amount) : undefined;
        this.unit_price = data.unit_price !== undefined ? Number(data.unit_price) : undefined;
    }
}

export class SaleDTO {
    constructor(data = {}) {
        this.id_sale = data.id_sale !== undefined ? Number(data.id_sale) : undefined;
        this.id_client = data.id_client !== undefined ? Number(data.id_client) : undefined;
        this.date_sale = data.date_sale;
        this.total = data.total !== undefined ? Number(data.total) : undefined;
        this.details = Array.isArray(data.details)
            ? data.details.map(detail => new SaleDetailDTO(detail))
            : undefined;
    }
   
    static from(data) {
        if (!data) return null;
        return new SaleDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new SaleDTO(item));
    }
}