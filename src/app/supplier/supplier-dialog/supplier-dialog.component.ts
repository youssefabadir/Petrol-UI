import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/Helper.util';
import {defaultSupplier, Supplier} from '../../models/supplier.model';
import {defaultCustomer} from '../../models/customer.model';

@Component({
    selector: 'supplier-dialog',
    templateUrl: './supplier-dialog.component.html',
    styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent implements OnInit {

    supplier: Supplier = defaultSupplier;

    isEdit: boolean;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<SupplierDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Supplier) {

        if (data) {
            this.isEdit = true;
            this.supplier = data;
        }
    }

    ngOnInit(): void {
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateSupplier(this.supplier).subscribe(() => {
                Helper.snackbar('Supplier data has been updated successfully', this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar('Error while updating supplier data', this.snackbar);
            });
        } else {
            this.apiService.createSupplier(this.supplier).subscribe(() => {
                Helper.snackbar('Supplier data has been saved successfully', this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar('Error while saving supplier data', this.snackbar);
            });
        }
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }

    protected readonly defaultCustomer = defaultCustomer;
}
