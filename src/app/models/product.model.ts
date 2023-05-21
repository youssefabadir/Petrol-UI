export interface Product {

    id: number;

    name?: string;

    price?: number;
}

export const defaultProduct: Product = {
    id: null,
    name: '',
    price: null
}