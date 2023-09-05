export interface IDividendsTable {
    titles: IDividendsTableTitle[];
    rows: IDividendsTableRow[];
}

export interface IDividendsTableTitle {
    title:string;
}

export interface IDividendsTableRow {
    Dividend:string;
    ExpiryDate:string;
    Franking:string;
    Type:string;
    PaymentDate:string;
}
