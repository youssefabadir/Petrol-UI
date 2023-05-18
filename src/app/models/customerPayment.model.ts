import {Customer, defaultCustomer} from './customer.model';
import {defaultPaymentMethod, PaymentMethod} from './paymentMethod.model';

export interface CustomerPayment {

    id?: number;

    customerEntity: Customer;

    paymentMethodEntity: PaymentMethod;

    amount: number;

    number: string;

    transferred: boolean;

    date: string;

}

export const defaultCustomerPayment: CustomerPayment = {
    id: null,
    customerEntity: defaultCustomer,
    paymentMethodEntity: defaultPaymentMethod,
    amount: null,
    number: '',
    transferred: null,
    date: null
}