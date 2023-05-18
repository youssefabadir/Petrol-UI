import {Supplier} from './supplier.model';
import {Customer} from './customer.model';
import {Product} from './product.model';

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
    supplierEntity: {id: null},
    customerEntity: {id: null},
    productEntity: {id: null},
    number: null,
    amount: null,
    quantity: null,
    date: null
}