import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/Helper.util';
import {defaultProduct, Product} from '../../models/product.model';

@Component({
    selector: 'product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

    product: Product = defaultProduct;

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
                Helper.snackbar('Product has been updated successfully', this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar('Error while updating product data', this.snackbar);
            });
        } else {
            this.apiService.createProduct(this.product).subscribe(() => {
                Helper.snackbar('Product data has been saved successfully', this.snackbar);
                this.dialogRef.close(true);
            }, () => {
                Helper.snackbar('Error while saving product data', this.snackbar);
            });
        }
    }

    cancel(): void {
        this.dialogRef.close(undefined);
    }

}
