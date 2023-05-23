export interface Product {

    id: number;

    name?: string;

    customerPrice?: number;

    supplierPrice?: number;
}

export function createEmptyProduct(): Product {
    return {
        id: undefined,
        name: '',
        customerPrice: undefined,
        supplierPrice: undefined
    }
}