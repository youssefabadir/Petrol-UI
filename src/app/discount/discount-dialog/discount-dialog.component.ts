import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from '../../models/customer.model';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/Helper.util';
import {defaultDiscount, Discount} from '../../models/discount.model';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {Product} from '../../models/product.model';

@Component({
    selector: 'discount-dialog',
    templateUrl: './discount-dialog.component.html',
    styleUrls: ['./discount-dialog.component.css']
})
export class DiscountDialogComponent implements OnInit {

    discount: Discount = defaultDiscount;

    isEdit: boolean;

    loadingCustomers: boolean;

    customerSearch: Observable<Customer[]>;

    loadingProducts: boolean;

    productSearch: Observable<Product[]>;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<DiscountDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Discount) {

        if (data) {
            this.isEdit = true;
            this.discount = data;
            this.customerSearch = concat(
                    of([]),
                    this.apiService.searchCustomers(data.customerName).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingCustomers = false)
                    )
            );
            this.productSearch = concat(
                    of([]),
                    this.apiService.searchProducts(data.productName).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingProducts = false)
                    )
            );
        }
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

    loadProducts(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.productSearch = concat(
                    of([]),
                    this.apiService.searchProducts(name).pipe(
                            catchError(() => of([])),
                            tap(() => this.loadingProducts = false)
                    )
            );
        }
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateDiscount(this.discount).subscribe(() => {
                Helper.snackbar(Helper.translateKey('UPDATE_DISCOUNT_SUCCESS'), this.snackbar);
                this.cancel(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('UPDATE_DISCOUNT_ERROR'), this.snackbar);
            });
        } else {
            this.apiService.createDiscount(this.discount).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_DISCOUNT_SUCCESS'), this.snackbar);
                this.cancel(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('SAVE_DISCOUNT_ERROR'), this.snackbar);
            });
        }
    }

    cancel(result: boolean): void {
        this.dialogRef.close(result);
    }

}
