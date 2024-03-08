import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';
import {PageableResponse} from '../models/response.model';
import {Supplier} from '../models/supplier.model';
import {Product} from '../models/product.model';
import {Bill} from '../models/bill.model';
import {CustomerPayment} from '../models/customerPayment.model';
import {OwnerPayment} from '../models/ownerPayment.model';
import {PaymentMethod} from '../models/paymentMethod.model';
import {CustomerTransaction} from '../models/customer-transaction.model';
import {SupplierTransaction} from '../models/supplierTransaction.model';
import {Discount} from '../models/discount.model';
import {Payment} from '../models/payment.model';
import {Truck} from '../models/truck.model';
import {Shipment} from '../models/shipment.model';
import {Expense} from '../models/expense.model';
import {FinancialSummary} from '../models/financialSummary.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getCustomers(name: string = '',
                 pageNo: number = 0,
                 pageSize: number = 10,
                 sortBy: string = 'id',
                 order: string = 'asc'): Observable<PageableResponse<Customer>> {
        return this.http.get<PageableResponse<Customer>>(`${url}/customer`, {
            params: {
                name: name,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    getSuppliers(name: string = '',
                 pageNo: number = 0,
                 pageSize: number = 10,
                 sortBy: string = 'id',
                 order: string = 'asc'): Observable<PageableResponse<Supplier>> {
        return this.http.get<PageableResponse<Supplier>>(`${url}/supplier`, {
            params: {
                name: name,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    getProducts(name: string = '',
                pageNo: number = 0,
                pageSize: number = 10,
                sortBy: string = 'id',
                order: string = 'asc'): Observable<PageableResponse<Product>> {
        return this.http.get<PageableResponse<Product>>(`${url}/product`, {
            params: {
                name: name,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    searchCustomers(name: string): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${url}/customer/search`, {
            params: {
                name: name
            }
        });
    }

    searchSuppliers(name: string): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(`${url}/supplier/search`, {
            params: {
                name: name
            }
        });
    }

    searchProducts(name: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${url}/product/search`, {
            params: {
                name: name
            }
        });
    }

    createBill(transaction: Bill, truckId: number): Observable<Bill> {
        return this.http.post<Bill>(`${url}/bill`, transaction, {
            params: {
                truckId: truckId
            }
        });
    }

    updateBill(transaction: Bill, truckId: number): Observable<Bill> {
        return this.http.put<Bill>(`${url}/bill`, transaction, {
            params: {
                truckId: truckId
            }
        });
    }

    deleteBill(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/bill/${id}`);
    }

    createCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${url}/customer`, customer);
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${url}/customer`, customer);
    }

    deleteCustomer(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/customer/${id}`);
    }

    createSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http.post<Supplier>(`${url}/supplier`, supplier);
    }

    updateSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http.put<Supplier>(`${url}/supplier`, supplier);
    }

    deleteSupplier(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/supplier/${id}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${url}/product`, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${url}/product`, product);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/product/${id}`);
    }

    getBills(billNumber: string = '',
             pageNo: number = 0,
             pageSize: number = 10,
             sortBy: string = 'date',
             order: string = 'asc',
             start: string = '',
             end: string = ''): Observable<PageableResponse<Bill>> {
        return this.http.get<PageableResponse<Bill>>(`${url}/bill`, {
            params: {
                number: billNumber,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order,
                start: start,
                end: end
            }
        });
    }

    getCustomerPayments(paymentNumber: string = '',
                        pageNo: number = 0,
                        pageSize: number = 10,
                        sortBy: string = 'date',
                        order: string = 'asc'): Observable<PageableResponse<CustomerPayment>> {
        return this.http.get<PageableResponse<CustomerPayment>>(`${url}/payment/customer`, {
            params: {
                number: paymentNumber,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    getOwnerPayments(paymentNumber: string = '',
                     pageNo: number = 0,
                     pageSize: number = 10,
                     sortBy: string = 'date',
                     order: string = 'asc'): Observable<PageableResponse<OwnerPayment>> {
        return this.http.get<PageableResponse<OwnerPayment>>(`${url}/payment/owner`, {
            params: {
                number: paymentNumber,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    getPaymentMethods(name: string = '',
                      pageNo: number = 0,
                      pageSize: number = 10,
                      sortBy: string = 'id',
                      order: string = 'asc'): Observable<PageableResponse<PaymentMethod>> {
        return this.http.get<PageableResponse<PaymentMethod>>(`${url}/payment-method`, {
            params: {
                name: name,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    createPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        return this.http.post<PaymentMethod>(`${url}/payment-method`, paymentMethod);
    }

    updatePaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        return this.http.put<PaymentMethod>(`${url}/payment-method`, paymentMethod);
    }

    deletePaymentMethod(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/payment-method/${id}`);
    }

    createCustomerPayment(customerPayment: CustomerPayment, supplierId: number = -1): Observable<CustomerPayment> {
        return this.http.post<CustomerPayment>(`${url}/payment/customer?supplierId=${supplierId}`, customerPayment);
    }

    deleteCustomerPayment(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/payment/${id}`);
    }

    createOwnerPayment(ownerPayment: OwnerPayment): Observable<OwnerPayment> {
        return this.http.post<OwnerPayment>(`${url}/payment/owner`, ownerPayment);
    }

    deleteOwnerPayment(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/payment/${id}`);
    }

    searchPaymentMethods(name: string): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(`${url}/payment-method/search`, {
            params: {
                name: name
            }
        });
    }

    getCustomerTransactions(customerId: number,
                            pageNo: number = 0,
                            pageSize: number = 10,
                            sortBy: string = 'date',
                            order: string = 'asc',
                            start: string = '',
                            end: string = ''): Observable<PageableResponse<CustomerTransaction>> {
        return this.http.get<PageableResponse<CustomerTransaction>>(`${url}/transaction/customer/${customerId}`, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order,
                start: start,
                end: end
            }
        });
    }

    getSupplierTransactions(supplierId: number,
                            pageNo: number = 0,
                            pageSize: number = 10,
                            sortBy: string = 'date',
                            order: string = 'asc',
                            start: string = '',
                            end: string = ''): Observable<PageableResponse<SupplierTransaction>> {
        return this.http.get<PageableResponse<SupplierTransaction>>(`${url}/transaction/owner/${supplierId}`, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order,
                start: start,
                end: end
            }
        });
    }

    getDiscounts(customerName: string = '',
                 productName: string = '',
                 pageNo: number = 0,
                 pageSize: number = 10,
                 sortBy: string = 'id',
                 order: string = 'asc'): Observable<PageableResponse<Discount>> {
        return this.http.get<PageableResponse<Discount>>(`${url}/discount`, {
            params: {
                customerName: customerName,
                productName: productName,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    createDiscount(discount: Discount): Observable<Discount> {
        return this.http.post<Discount>(`${url}/discount`, discount);
    }

    updateDiscount(discount: Discount): Observable<Discount> {
        return this.http.put<Discount>(`${url}/discount`, discount);
    }

    deleteDiscount(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/discount/${id}`);
    }

    getPayments(paymentMethodId: number = -1,
                pageNo: number = 0,
                pageSize: number = 10,
                sortBy: string = 'date',
                order: string = 'asc',
                start: string = '',
                end: string = ''): Observable<PageableResponse<Payment>> {
        return this.http.get<PageableResponse<Payment>>(`${url}/payment`, {
            params: {
                paymentMethodId: paymentMethodId,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order,
                start: start,
                end: end
            }
        });
    }

    getTrucks(number: string = '',
              pageNo: number = 0,
              pageSize: number = 10,
              sortBy: string = 'id',
              order: string = 'asc'): Observable<PageableResponse<Truck>> {
        return this.http.get<PageableResponse<Truck>>(`${url}/truck`, {
            params: {
                number: number,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    createTruck(truck: Truck): Observable<Truck> {
        return this.http.post<Truck>(`${url}/truck`, truck);
    }

    updateTruck(truck: Truck): Observable<Truck> {
        return this.http.put<Truck>(`${url}/truck`, truck);
    }

    deleteTruck(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/truck/${id}`);
    }

    searchTrucks(number: string): Observable<Truck[]> {
        return this.http.get<Truck[]>(`${url}/truck/search`, {
            params: {
                number: number
            }
        });
    }

    getShipments(billNumber: string = '',
                 pageNo: number = 0,
                 pageSize: number = 10,
                 sortBy: string = 'id',
                 order: string = 'asc'): Observable<PageableResponse<Shipment>> {
        return this.http.get<PageableResponse<Shipment>>(`${url}/shipment`, {
            params: {
                billNumber: billNumber,
                pageNo: pageNo,
                pageSize: pageSize,
                sortBy: sortBy,
                order: order
            }
        });
    }

    createExpense(expense: Expense, paymentMethodId: number): Observable<Expense> {
        return this.http.post<Expense>(`${url}/expense`, expense, {
            params: {
                paymentMethodId: paymentMethodId
            }
        });
    }

    updateExpense(expense: Expense, paymentMethodId: number): Observable<Expense> {
        return this.http.put<Expense>(`${url}/expense`, expense, {
            params: {
                paymentMethodId: paymentMethodId
            }
        });
    }

    deleteExpense(id: number): Observable<void> {
        return this.http.delete<void>(`${url}/expense/${id}`);
    }

    getCustomerFinancialSummary(customerId: number,
                                start: string,
                                end: string,
                                productId: string,
                                paymentMethodId: string): Observable<FinancialSummary> {
        return this.http.get<FinancialSummary>(`${url}/financial-summary/customer/${customerId}`, {
            params: {
                productId: productId,
                paymentMethodId: paymentMethodId,
                start: start,
                end: end
            }
        });
    }
}
