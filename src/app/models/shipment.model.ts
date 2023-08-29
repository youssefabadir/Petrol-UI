import {Expense} from './expense.model';
import {Bill, createEmptyBill} from './bill.model';
import {createEmptyTruck, Truck} from './truck.model';

export interface Shipment {
    id: number,

    billEntity: Bill,

    truckEntity: Truck,

    truckBalance: number,

    revenue: number,

    note: string,

    expenseEntities: Expense[]
}

export function createEmptyShipment(): Shipment {
    return {
        id: undefined,
        billEntity: createEmptyBill(),
        truckEntity: createEmptyTruck(),
        truckBalance: undefined,
        revenue: undefined,
        note: undefined,
        expenseEntities: []
    }
}