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
        this.id_user = data.id_user !== undefined ? Number(data.id_user) : undefined;
        this.date_sale = data.date_sale;
        this.total = data.total !== undefined ? Number(data.total) : undefined;
        this.state_sale = data.state_sale;
        this.user_name = data.user_name ?? undefined;
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