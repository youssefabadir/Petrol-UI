import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyPaymentMethod, PaymentMethod} from '../../models/paymentMethod.model';

@Component({
    selector: 'payment-method-dialog',
    templateUrl: './payment-method-dialog.component.html',
    styleUrls: ['./payment-method-dialog.component.css']
})
export class PaymentMethodDialogComponent implements OnInit {


    paymentMethod: PaymentMethod = createEmptyPaymentMethod();

    isEdit: boolean;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<PaymentMethodDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: PaymentMethod) {

        if (data) {
            this.isEdit = true;
            this.paymentMethod = data;
        }
    }

    ngOnInit(): void {
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updatePaymentMethod(this.paymentMethod).subscribe(() => {
                Helper.snackbar(Helper.translateKey('UPDATE_PAYMENT_METHOD_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, (error) => {
                if (error.status === 409) {
                    Helper.snackbar(Helper.translateKey('PAYMENT_METHOD_CONFLICT'), this.snackbar);
                } else {
                    Helper.snackbar(Helper.translateKey('UPDATE_PAYMENT_METHOD_ERROR'), this.snackbar);
                }
            });
        } else {
            this.apiService.createPaymentMethod(this.paymentMethod).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_PAYMENT_METHOD_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, (error) => {
                if (error.status === 409) {
                    Helper.snackbar(Helper.translateKey('PAYMENT_METHOD_CONFLICT'), this.snackbar);
                } else {
                    Helper.snackbar(Helper.translateKey('SAVE_PAYMENT_METHOD_ERROR'), this.snackbar);
                }
            });
        }
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }

    protected readonly Helper = Helper;
}
