import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyOwnerPayment, OwnerPayment} from '../../models/ownerPayment.model';
import {Supplier} from '../../models/supplier.model';
import {PaymentMethod} from '../../models/paymentMethod.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'owner-payment-dialog',
    templateUrl: './owner-payment-dialog.component.html',
    styleUrls: ['./owner-payment-dialog.component.css']
})
export class OwnerPaymentDialogComponent implements OnInit {

    ownerPayment: OwnerPayment = createEmptyOwnerPayment();

    selectedDate: Date;

    @ViewChild('tab', {static: false}) tab;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<OwnerPaymentDialogComponent>,
                private snackbar: MatSnackBar, public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

    handleSupplier(supplier: Supplier): void {
        this.ownerPayment.supplier = supplier;
    }

    handlePaymentMethod(paymentMethod: PaymentMethod): void {
        this.ownerPayment.paymentMethodId = paymentMethod.id;
        this.ownerPayment.paymentMethodName = paymentMethod.name;
        this.ownerPayment.paymentMethodBalance = paymentMethod.balance;
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

    close(): void {
        this.dialogRef.close(undefined);
    }

    changeTab(): void {
        this.ownerPayment = createEmptyOwnerPayment();
        this.selectedDate = undefined;
        this.tab.realignInkBar();
    }

    protected readonly Helper = Helper;
}
