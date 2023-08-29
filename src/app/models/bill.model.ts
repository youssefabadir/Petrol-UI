import {createEmptySupplier, Supplier} from './supplier.model';
import {createEmptyCustomer, Customer} from './customer.model';
import {createEmptyProduct, Product} from './product.model';
import {createEmptyTruck, Truck} from './truck.model';

export interface Bill {

    id?: number;

    supplierEntity: Supplier;

    customerEntity: Customer;

    productEntity: Product;

    number: number;

    supplierAmount: number;

    customerAmount: number;

    quantity: number;

    date: string;

    truckEntity: Truck;

}

export function createEmptyBill(): Bill {
    return {
        supplierEntity: createEmptySupplier(),
        customerEntity: createEmptyCustomer(),
        productEntity: createEmptyProduct(),
        number: undefined,
        supplierAmount: undefined,
        customerAmount: undefined,
        quantity: undefined,
        date: undefined,
        truckEntity: createEmptyTruck()
    }
}