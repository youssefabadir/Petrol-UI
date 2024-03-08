import {Component, Inject, OnInit} from '@angular/core';
import {createEmptyPaymentMethod, PaymentMethod} from '../models/paymentMethod.model';
import {createEmptyProduct, Product} from '../models/product.model';
import {Helper} from '../util/helper.util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {createEmptyFinancialSummary} from '../models/financialSummary.model';

@Component({
    selector: 'financial-summary-dialog',
    templateUrl: './financial-summary-dialog.component.html',
    styleUrls: ['./financial-summary-dialog.component.css']
})
export class FinancialSummaryDialogComponent implements OnInit {

    financialSummary = createEmptyFinancialSummary();

    customerId: number;

    product = createEmptyProduct();

    paymentMethod = createEmptyPaymentMethod();

    startDate: Date;

    endDate: Date;

    constructor(private dialogRef: MatDialogRef<FinancialSummaryDialogComponent>,
                private apiService: ApiService, @Inject(MAT_DIALOG_DATA) private data: number, private snackbar: MatSnackBar) {
        if (data) {
            this.customerId = data;
        }
    }

    ngOnInit(): void {
    }

    handleProduct(product: Product): void {
        this.product = product;
    }

    handlePaymentMethod(paymentMethod: PaymentMethod): void {
        this.paymentMethod.id = paymentMethod.id;
        this.paymentMethod.name = paymentMethod.name;
        this.paymentMethod.balance = paymentMethod.balance;
    }

    submit(): void {
        const productId = this.product.id ? this.product.id.toString() : '';
        const paymentMethodId = this.product.id ? this.product.id.toString() : '';
        this.apiService.getCustomerFinancialSummary(this.customerId, Helper.changeDateFormat(this.startDate),
                Helper.changeDateFormat(this.endDate), productId, paymentMethodId).subscribe({
            next: (res) => {
                this.financialSummary = res;
                this.close({
                    financialSummary: this.financialSummary,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
            },
            error: () => Helper.snackbar(Helper.translateKey('RETRIEVE_PAYMENTS_ERROR'), this.snackbar) // TODO: Implement error message
        });
    }

    close(result: any): void {
        this.dialogRef.close(result);
    }

    protected readonly Helper = Helper;
}
