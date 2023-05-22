import {createEmptySupplier, Supplier} from './supplier.model';
import {createEmptyPaymentMethod, PaymentMethod} from './paymentMethod.model';

export interface OwnerPayment {

    id?: number;

    supplierEntity: Supplier;

    amount: number;

    number: string;

    paymentMethodEntity: PaymentMethod;

    date: string;

}

export function createEmptyOwnerPayment(): OwnerPayment {
    return {
        id: undefined,
        supplierEntity: createEmptySupplier(),
        amount: undefined,
        number: '',
        paymentMethodEntity: createEmptyPaymentMethod(),
        date: ''
    }
}