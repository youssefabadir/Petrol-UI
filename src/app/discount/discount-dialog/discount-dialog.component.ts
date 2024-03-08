import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from '../../models/customer.model';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyDiscount, Discount} from '../../models/discount.model';
import {Product} from '../../models/product.model';

@Component({
    selector: 'discount-dialog',
    templateUrl: './discount-dialog.component.html',
    styleUrls: ['./discount-dialog.component.css']
})
export class DiscountDialogComponent implements OnInit {

    discount: Discount = createEmptyDiscount();

    isEdit: boolean;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<DiscountDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Discount) {

        if (data) {
            this.isEdit = true;
            this.discount = data;
        }
    }

    ngOnInit(): void {
    }

    handleCustomer(customer: Customer): void {
        if (customer) {
            this.discount.customerId = customer.id;
            this.discount.customerName = customer.name;
        } else {
            this.discount.customerId = undefined;
            this.discount.customerName = undefined;
        }
    }

    handleProduct(product: Product): void {
        if (product) {
            this.discount.productId = product.id;
            this.discount.productName = product.name;
        } else {
            this.discount.productId = undefined;
            this.discount.productName = undefined;
        }

    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateDiscount(this.discount).subscribe(() => {
                Helper.snackbar(Helper.translateKey('UPDATE_DISCOUNT_SUCCESS'), this.snackbar);
                this.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('UPDATE_DISCOUNT_ERROR'), this.snackbar);
            });
        } else {
            this.apiService.createDiscount(this.discount).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_DISCOUNT_SUCCESS'), this.snackbar);
                this.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('SAVE_DISCOUNT_ERROR'), this.snackbar);
            });
        }
    }

    close(result: boolean): void {
        this.dialogRef.close(result);
    }

    protected readonly Helper = Helper;
}
