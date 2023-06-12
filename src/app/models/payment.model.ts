import {createEmptySupplier, Supplier} from './supplier.model';
import {createEmptyCustomer, Customer} from './customer.model';

export interface Payment {
    id?: number;

    supplier: Supplier;

    customer: Customer;

    paymentAmount: number;

    paymentNumber: string;

    paymentMethodId: number;

    paymentMethodName: string;

    paymentMethodBalance: number;

    treasuryBalance: number;

    date: string;
}

export function createEmptyPayment(): Payment {
    return {
        id: undefined,
        supplier: createEmptySupplier(),
        customer: createEmptyCustomer(),
        paymentAmount: undefined,
        paymentNumber: undefined,
        paymentMethodId: undefined,
        paymentMethodName: undefined,
        paymentMethodBalance: undefined,
        treasuryBalance: undefined,
        date: undefined
    }
}