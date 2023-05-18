import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Customer, defaultCustomer} from '../../models/customer.model';
import {Helper} from '../../util/Helper.util';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'customer-dialog',
    templateUrl: './customer-dialog.component.html',
    styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

    customer: Customer = defaultCustomer;

    isEdit: boolean;

    customerForm: FormGroup

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<CustomerDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Customer,
                private fb: FormBuilder,) {

        if (data) {
            this.isEdit = true;
            this.customer = data;
        }
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            name: [this.customer.name, []],
            balance: [this.customer.balance, []]
        });
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateCustomer(this.customer).subscribe(() => {
                Helper.snackbar(Helper.translateKey('UPDATE_CUSTOMER_SUCCESS'), this.snackbar);
                this.cancel(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('UPDATE_CUSTOMER_ERROR'), this.snackbar);
            });
        } else {
            this.apiService.createCustomer(this.customer).subscribe(() => {
                Helper.snackbar(Helper.translateKey('SAVE_CUSTOMER_SUCCESS'), this.snackbar);
                this.cancel(true);
            }, () => {
                Helper.snackbar(Helper.translateKey('SAVE_CUSTOMER_ERROR'), this.snackbar);
            });
        }
    }

    cancel(result: boolean): void {
        this.customer = defaultCustomer;
        this.dialogRef.close(result);
    }

}
