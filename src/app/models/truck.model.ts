export interface Truck {
    id: number,

    number: string,

    balance: number
}

export function createEmptyTruck(): Truck {
    return {
        id: undefined,
        number: undefined,
        balance: undefined
    }
}