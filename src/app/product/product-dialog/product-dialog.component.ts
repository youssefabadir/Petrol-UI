import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyProduct, Product} from '../../models/product.model';

@Component({
    selector: 'product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

    product: Product = createEmptyProduct();

    isEdit: boolean;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<ProductDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Product) {

        if (data) {
            this.isEdit = true;
            this.product = data;
        }
    }

    ngOnInit(): void {
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateProduct(this.product).subscribe(() => {
                Helper.snackbar(Helper.translateKey('UPDATE_PRODUCT_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('UPDATE_PRODUCT_ERROR'), this.snackbar);
            });
        } else {
            this.apiService.createProduct(this.product).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_PRODUCT_SUCCESS'), this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('SAVE_PRODUCT_ERROR'), this.snackbar);
            });
        }
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }

}
