import {defaultSupplier, Supplier} from './supplier.model';
import {createEmptyPaymentMethod, PaymentMethod} from './paymentMethod.model';

export interface OwnerPayment {

    id?: number;

    supplierEntity: Supplier;

    amount: number;

    number: string;

    paymentMethodEntity: PaymentMethod;

    date: string;

}

export const defaultOwnerPayment: OwnerPayment = {
    id: null,
    supplierEntity: {...defaultSupplier},
    amount: null,
    number: '',
    paymentMethodEntity: createEmptyPaymentMethod(),
    date: ''
}