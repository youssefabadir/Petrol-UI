import {createEmptySupplier, Supplier} from './supplier.model';

export interface OwnerPayment {

    id?: number;

    supplier: Supplier;

    amount: number;

    number: string;

    paymentMethodId: number;

    paymentMethodName: string;

    paymentMethodBalance: number;

    date: string;

}

export function createEmptyOwnerPayment(): OwnerPayment {
    return {
        id: undefined,
        supplier: createEmptySupplier(),
        amount: undefined,
        number: '',
        paymentMethodId: undefined,
        paymentMethodName: undefined,
        paymentMethodBalance: undefined,
        date: ''
    }
}