import {defaultSupplier, Supplier} from './supplier.model';
import {Customer, defaultCustomer} from './customer.model';
import {defaultProduct, Product} from './product.model';

export interface Bill {

    id?: number;

    supplierEntity: Supplier;

    customerEntity: Customer;

    productEntity: Product;

    number: number;

    amount: number;

    quantity: number;

    date: string;

}

export const defaultBill: Bill = {
    supplierEntity: {...defaultSupplier},
    customerEntity: {...defaultCustomer},
    productEntity: {...defaultProduct},
    number: null,
    amount: null,
    quantity: null,
    date: null
}