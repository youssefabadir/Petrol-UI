export interface Customer {

    id: number;

    name?: string;

    balance?: number;
}

export const defaultCustomer: Customer = {
    id: null,
    name: '',
    balance: null
}