import {Component, OnInit} from '@angular/core';
import {Customer} from '../../models/customer.model';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {Supplier} from '../../models/supplier.model';
import {Product} from '../../models/product.model';
import {MatDialogRef} from '@angular/material/dialog';
import {Helper} from '../../util/Helper.util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bill, defaultBill} from '../../models/bill.model';

@Component({
    selector: 'transaction-dialog',
    templateUrl: './bill-dialog.component.html',
    styleUrls: ['./bill-dialog.component.css']
})
export class BillDialogComponent implements OnInit {

    bill: Bill = defaultBill;

    selectedDate: Date;

    loadingCustomers: boolean;

    customerSearch: Observable<Customer[]>;

    loadingSuppliers: boolean;

    supplierSearch: Observable<Supplier[]>;

    loadingProducts: boolean;

    productSearch: Observable<Product[]>;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<BillDialogComponent>,
                private snackbar: MatSnackBar) {
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
        this.bill.date = Helper.changeDateFormat(this.selectedDate);

        this.apiService.createBill(this.bill).subscribe(() => {
            Helper.snackbar(Helper.translateKey('SAVE_BILL_SUCCESS'), this.snackbar);
            this.dialogRef.close(true);
        }, () => {
            Helper.snackbar(Helper.translateKey('SAVE_BILL_ERROR'), this.snackbar);
        });
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }

}
