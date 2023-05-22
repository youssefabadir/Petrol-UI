import {createEmptyCustomer, Customer} from './customer.model';
import {createEmptyPaymentMethod, PaymentMethod} from './paymentMethod.model';

export interface CustomerPayment {

    id?: number;

    customerEntity: Customer;

    paymentMethodEntity: PaymentMethod;

    amount: number;

    number: string;

    transferred: boolean;

    date: string;

}

export function createEmptyCustomerPayment(): CustomerPayment {
    return {
        id: undefined,
        customerEntity: createEmptyCustomer(),
        paymentMethodEntity: createEmptyPaymentMethod(),
        amount: undefined,
        number: '',
        transferred: undefined,
        date: undefined
    }
}