import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyExpense, Expense} from '../../models/expense.model';
import {createEmptyPaymentMethod, PaymentMethod} from '../../models/paymentMethod.model';

@Component({
    selector: 'expense-dialog',
    templateUrl: './expense-dialog.component.html',
    styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

    expense: Expense = createEmptyExpense();

    paymentMethod: PaymentMethod = createEmptyPaymentMethod();

    isEdit: boolean;

    expenseForm: FormGroup;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<ExpenseDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: Expense,
                private fb: FormBuilder,) {

        if (data.id) {
            this.isEdit = true;
        }
        this.expense = data;
    }

    ngOnInit(): void {
        this.expenseForm = this.fb.group({
            amount: [this.expense.amount, []],
            note: [this.expense.note, []]
        });
    }

    save(): void {
        if (this.isEdit) {
            this.apiService.updateExpense(this.expense, this.paymentMethod.id).subscribe({
                next: () => {
                    Helper.snackbar(Helper.translateKey('UPDATE_EXPENSE_SUCCESS'), this.snackbar);
                    this.close(true);
                },
                error: () => Helper.snackbar(Helper.translateKey('UPDATE_EXPENSE_ERROR'), this.snackbar)
            });
        } else {
            this.apiService.createExpense(this.expense, this.paymentMethod.id).subscribe({
                next: () => {
                    Helper.snackbar(Helper.translateKey('SAVE_EXPENSE_SUCCESS'), this.snackbar);
                    this.close(true);
                },
                error: () => Helper.snackbar(Helper.translateKey('SAVE_EXPENSE_ERROR'), this.snackbar)
            });
        }
    }

    handlePaymentMethod(paymentMethod: PaymentMethod): void {
        this.paymentMethod = paymentMethod;
    }

    close(result: boolean): void {
        this.dialogRef.close(result);
    }

    protected readonly Helper = Helper;

}
