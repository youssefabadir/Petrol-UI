import {Component, OnInit} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {PaymentMethod} from '../../models/paymentMethod.model';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/Helper.util';
import {defaultOwnerPayment, OwnerPayment} from '../../models/ownerPayment.model';
import {Supplier} from '../../models/supplier.model';

@Component({
    selector: 'owner-payment-dialog',
    templateUrl: './owner-payment-dialog.component.html',
    styleUrls: ['./owner-payment-dialog.component.css']
})
export class OwnerPaymentDialogComponent implements OnInit {

    ownerPayment: OwnerPayment = defaultOwnerPayment;

    loadingSuppliers: boolean;

    supplierSearch: Observable<Supplier[]>;

    loadingPaymentMethods: boolean;

    paymentMethodSearch: Observable<PaymentMethod[]>;

    selectedDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<OwnerPaymentDialogComponent>,
                private snackbar: MatSnackBar,) {
    }

    ngOnInit(): void {
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
        this.ownerPayment.date = Helper.changeDateFormat(this.selectedDate);

        console.log(this.ownerPayment)
        this.apiService.createOwnerPayment(this.ownerPayment).subscribe(() => {
            Helper.snackbar(Helper.translateKey('SAVE_OWNER_PAYMENT_SUCCESS'), this.snackbar);
            this.dialogRef.close(true);
        }, () => {
            Helper.snackbar(Helper.translateKey('SAVE_OWNER_PAYMENT_ERROR'), this.snackbar);
        });
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }
}
