import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/Helper.util';
import {CustomerPayment, defaultCustomerPayment} from '../../models/customerPayment.model';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {Customer} from '../../models/customer.model';
import {PaymentMethod} from '../../models/paymentMethod.model';
import {Supplier} from '../../models/supplier.model';

@Component({
    selector: 'customer-payment-dialog',
    templateUrl: './customer-payment-dialog.component.html',
    styleUrls: ['./customer-payment-dialog.component.css']
})
export class CustomerPaymentDialogComponent implements OnInit {

    customerPayment: CustomerPayment = defaultCustomerPayment;

    loadingCustomers: boolean;

    customerSearch: Observable<Customer[]>;

    loadingPaymentMethods: boolean;

    paymentMethodSearch: Observable<PaymentMethod[]>;

    loadingSuppliers: boolean;

    supplierSearch: Observable<Supplier[]>;

    supplierId: number;

    selectedDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<CustomerPaymentDialogComponent>,
                private snackbar: MatSnackBar,) {
    }

    ngOnInit(): void {
    }

    loadCustomers(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.customerSearch = concat(
                    of([]),
                    this.apiService.searchCustomers(name).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingCustomers = false)
                    )
            );
        }
    }

    loadSuppliers(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.supplierSearch = concat(
                    of([]),
                    this.apiService.searchSuppliers(name).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingSuppliers = false)
                    )
            );
        }
    }

    loadPaymentMethods(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.paymentMethodSearch = concat(
                    of([]),
                    this.apiService.searchPaymentMethods(name).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingPaymentMethods = false)
                    )
            );
        }
    }

    save(): void {
        this.customerPayment.date = Helper.changeDateFormat(this.selectedDate);

        if (!this.customerPayment.transferred) {
            this.supplierId = -1;
        }
        this.apiService.createCustomerPayment(this.customerPayment, this.supplierId).subscribe(() => {
            Helper.snackbar(Helper.translateKey('SAVE_CUSTOMER_PAYMENT_SUCCESS'), this.snackbar);
            this.dialogRef.close(true);
        }, () => {
            Helper.snackbar(Helper.translateKey('SAVE_CUSTOMER_PAYMENT_ERROR'), this.snackbar);
        });
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }
}
