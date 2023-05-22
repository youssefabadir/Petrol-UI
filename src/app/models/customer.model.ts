export interface Customer {

    id: number;

    name?: string;

    balance?: number;
}

export function createEmptyCustomer(): Customer {
    return {
        id: undefined,
        name: undefined,
        balance: undefined
    }
}