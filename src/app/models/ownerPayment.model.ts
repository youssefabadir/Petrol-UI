import {createEmptySupplier, Supplier} from './supplier.model';

export interface OwnerPayment {

    id?: number;

    paymentType?: string;

    supplier: Supplier;

    amount: number;

    number: string;

    paymentMethodId: number;

    paymentMethodName: string;

    paymentMethodBalance: number;

    note: string;

    date: string;

}

export function createEmptyOwnerPayment(): OwnerPayment {
    return {
        id: undefined,
        paymentType: 'OWNER_PAYMENT',
        supplier: createEmptySupplier(),
        amount: undefined,
        number: '',
        paymentMethodId: undefined,
        paymentMethodName: undefined,
        paymentMethodBalance: undefined,
        note: undefined,
        date: undefined
    }
}