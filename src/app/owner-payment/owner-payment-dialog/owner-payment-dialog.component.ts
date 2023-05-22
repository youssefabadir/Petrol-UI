import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyOwnerPayment, OwnerPayment} from '../../models/ownerPayment.model';
import {Supplier} from '../../models/supplier.model';
import {PaymentMethod} from '../../models/paymentMethod.model';

@Component({
    selector: 'owner-payment-dialog',
    templateUrl: './owner-payment-dialog.component.html',
    styleUrls: ['./owner-payment-dialog.component.css']
})
export class OwnerPaymentDialogComponent implements OnInit {

    ownerPayment: OwnerPayment = createEmptyOwnerPayment();

    selectedDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<OwnerPaymentDialogComponent>,
                private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    handleSupplier(supplier: Supplier): void {
        this.ownerPayment.supplierEntity = supplier;
    }

    handlePaymentMethod(paymentMethod: PaymentMethod): void {
        this.ownerPayment.paymentMethodEntity = paymentMethod;
    }

    save(): void {
        this.ownerPayment.date = Helper.changeDateFormat(this.selectedDate);

        this.apiService.createOwnerPayment(this.ownerPayment).subscribe(() => {
            Helper.snackbar(Helper.translateKey('SAVE_OWNER_PAYMENT_SUCCESS'), this.snackbar);
            this.dialogRef.close(true);
        }, (error) => {
            if (error.status === 409) {
                Helper.snackbar(Helper.translateKey('SAVE_PAYMENT_CONFLICT'), this.snackbar);
            } else {
                Helper.snackbar(Helper.translateKey('SAVE_OWNER_PAYMENT_ERROR'), this.snackbar);
            }
        });
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }
}
