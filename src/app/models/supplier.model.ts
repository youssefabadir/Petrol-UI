export interface Supplier {

    id: number;

    name?: string;

    balance?: number;
}

export const defaultSupplier: Supplier = {
    id: null,
    name: '',
    balance: null
}