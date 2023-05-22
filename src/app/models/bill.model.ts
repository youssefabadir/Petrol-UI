import {createEmptySupplier, Supplier} from './supplier.model';
import {createEmptyCustomer, Customer} from './customer.model';
import {createEmptyProduct, Product} from './product.model';

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

export function createEmptyBill(): Bill {
    return {
        supplierEntity: createEmptySupplier(),
        customerEntity: createEmptyCustomer(),
        productEntity: createEmptyProduct(),
        number: undefined,
        amount: undefined,
        quantity: undefined,
        date: undefined
    }
}