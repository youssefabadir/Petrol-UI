import {createEmptyCustomer, Customer} from './customer.model';

export interface CustomerPayment {

    id?: number;

    paymentType?: string;

    customer: Customer;

    paymentMethodId: number;

    paymentMethodName: string;

    paymentMethodBalance: number;

    amount: number;

    number: string;

    transferred: boolean;

    note: string;

    date: string;

}

export function createEmptyCustomerPayment(): CustomerPayment {
    return {
        id: undefined,
        paymentType: 'CUSTOMER_PAYMENT',
        customer: createEmptyCustomer(),
        paymentMethodId: undefined,
        paymentMethodName: undefined,
        paymentMethodBalance: undefined,
        amount: undefined,
        number: '',
        transferred: undefined,
        note: undefined,
        date: undefined
    }
}