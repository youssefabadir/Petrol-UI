import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyCustomerPayment, CustomerPayment} from '../../models/customerPayment.model';
import {TranslateService} from '@ngx-translate/core';
import {Customer} from '../../models/customer.model';
import {Supplier} from '../../models/supplier.model';
import {PaymentMethod} from '../../models/paymentMethod.model';

@Component({
    selector: 'customer-payment-dialog',
    templateUrl: './customer-payment-dialog.component.html',
    styleUrls: ['./customer-payment-dialog.component.css']
})
export class CustomerPaymentDialogComponent implements OnInit {

    customerPayment: CustomerPayment = createEmptyCustomerPayment();

    supplierId: number;

    selectedDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<CustomerPaymentDialogComponent>,
                private snackbar: MatSnackBar, public translate: TranslateService) {
    }

    ngOnInit(): void {
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

    handleCustomer(customer: Customer): void {
        this.customerPayment.customerEntity = customer;
    }

    handleSupplier(supplier: Supplier): void {
        this.supplierId = supplier.id;
    }

    handlePaymentMethod(paymentMethod: PaymentMethod): void {
        this.customerPayment.paymentMethodEntity = paymentMethod;
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }
}
