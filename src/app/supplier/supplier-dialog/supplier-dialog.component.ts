import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptySupplier, Supplier} from '../../models/supplier.model';

@Component({
    selector: 'supplier-dialog',
    templateUrl: './supplier-dialog.component.html',
    styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent implements OnInit {

    supplier: Supplier = createEmptySupplier();

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
                Helper.snackbar(Helper.translateKey('UPDATE_SUPPLIER_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('UPDATE_SUPPLIER_ERROR'), this.snackbar);
            });
        } else {
            this.apiService.createSupplier(this.supplier).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_SUPPLIER_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('SAVE_SUPPLIER_ERROR'), this.snackbar);
            });
        }
    }

    close(): void {
        this.dialogRef.close(undefined);
    }

    protected readonly Helper = Helper;
}
