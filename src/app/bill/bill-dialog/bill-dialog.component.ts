import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Helper} from '../../util/helper.util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bill, createEmptyBill} from '../../models/bill.model';
import {Customer} from '../../models/customer.model';
import {Supplier} from '../../models/supplier.model';
import {Product} from '../../models/product.model';
import {TranslateService} from '@ngx-translate/core';
import {Truck} from '../../models/truck.model';

@Component({
    selector: 'transaction-dialog',
    templateUrl: './bill-dialog.component.html',
    styleUrls: ['./bill-dialog.component.css']
})
export class BillDialogComponent implements OnInit {

    bill: Bill = createEmptyBill();

    selectedDate: Date;

    isEdit: boolean;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<BillDialogComponent>,
                private snackbar: MatSnackBar, public translate: TranslateService, @Inject(MAT_DIALOG_DATA) data: Bill) {

        if (data) {
            this.bill = data;
            this.isEdit = true;
        }
    }

    ngOnInit(): void {
        //TODO: implement edit mapping
    }

    save(): void {
        this.bill.date = Helper.changeDateFormat(this.selectedDate);

        if (this.isEdit) {
            this.apiService.updateBill(this.bill, this.bill.truckEntity.id).subscribe({
                next: () => {
                    Helper.snackbar(Helper.translateKey('UPDATE_BILL_SUCCESS'), this.snackbar);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.log(err)
                    Helper.snackbar(Helper.translateKey('SAVE_BILL_ERROR'), this.snackbar)
                }
            });
        } else {
            this.apiService.createBill(this.bill, this.bill.truckEntity.id).subscribe({
                next: () => {
                    Helper.snackbar(Helper.translateKey('SAVE_BILL_SUCCESS'), this.snackbar);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    switch (err.status) {
                        case 409:
                            Helper.snackbar(Helper.translateKey('SAVE_BILL_ERROR_EXISTS'), this.snackbar);
                            break;
                        default:
                            Helper.snackbar(Helper.translateKey('SAVE_BILL_ERROR'), this.snackbar);
                            break;
                    }

                }
            });
        }
    }

    close(): void {
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

    handleTruck(truck: Truck): void {
        this.bill.truckEntity = truck;
    }

    protected readonly Helper = Helper;
}
