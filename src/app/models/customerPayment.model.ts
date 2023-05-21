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
        id: null,
        customerEntity: createEmptyCustomer(),
        paymentMethodEntity: createEmptyPaymentMethod(),
        amount: null,
        number: '',
        transferred: null,
        date: null
    }
}