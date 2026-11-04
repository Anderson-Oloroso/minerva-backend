export class LoanDetailDTO {
    constructor(data = {}) {
        this.id_loan_detail = data.id_loan_detail !== undefined ? Number(data.id_loan_detail) : undefined;
        this.id_book = data.id_book !== undefined ? Number(data.id_book) : undefined;
        this.state_book_out = data.state_book_out;
        this.state_book_in = data.state_book_in ?? null;
    }
}

export class LoanDTO {
    constructor(data = {}) {
        this.id_loan = data.id_loan !== undefined ? Number(data.id_loan) : undefined;
        this.id_user = data.id_user !== undefined ? Number(data.id_user) : undefined;
        this.date_loan = data.date_loan;
        this.expected_return_date = data.expected_return_date;
        this.return_date = data.return_date ?? null;
        this.state_loan = data.state_loan;
        this.user_name = data.user_name ?? undefined;
        this.details = Array.isArray(data.details)
            ? data.details.map(detail => new LoanDetailDTO(detail))
            : undefined;
    }

    static from(data) {
        if (!data) return null;
        return new LoanDTO(data);
    }

    static fromList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(item => new LoanDTO(item));
    }
}
