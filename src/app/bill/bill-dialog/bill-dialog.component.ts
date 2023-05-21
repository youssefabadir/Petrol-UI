import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Helper} from '../../util/helper.util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bill, defaultBill} from '../../models/bill.model';
import {Customer} from '../../models/customer.model';
import {Supplier} from '../../models/supplier.model';
import {Product} from '../../models/product.model';

@Component({
    selector: 'transaction-dialog',
    templateUrl: './bill-dialog.component.html',
    styleUrls: ['./bill-dialog.component.css']
})
export class BillDialogComponent implements OnInit {

    bill: Bill = defaultBill;

    selectedDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<BillDialogComponent>,
                private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
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

    handleCustomer(customer: Customer): void {
        this.bill.customerEntity = customer;
    }

    handleSupplier(supplier: Supplier): void {
        this.bill.supplierEntity = supplier;
    }

    handleProduct(product: Product): void {
        this.bill.productEntity = product;
    }

}
