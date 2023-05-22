export interface Product {

    id: number;

    name?: string;

    price?: number;
}

export function createEmptyProduct(): Product {
    return {
        id: undefined,
        name: '',
        price: undefined
    }
}