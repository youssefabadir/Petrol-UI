import {createEmptyShipment, Shipment} from './shipment.model';

export interface Expense {
    id: number,

    shipment: Shipment,

    amount: number,

    note: string
}

export function createEmptyExpense(): Expense {
    return {
        id: undefined,
        shipment: createEmptyShipment(),
        amount: undefined,
        note: undefined
    }
}