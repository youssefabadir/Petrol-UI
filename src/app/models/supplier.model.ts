export interface Supplier {

    id: number;

    name?: string;

    balance?: number;
}

export function createEmptySupplier(): Supplier {
    return {
        id: undefined,
        name: undefined,
        balance: undefined
    }
}