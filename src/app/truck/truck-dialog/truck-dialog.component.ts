import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {createEmptyTruck, Truck} from '../../models/truck.model';

@Component({
    selector: 'truck-dialog',
    templateUrl: './truck-dialog.component.html',
    styleUrls: ['./truck-dialog.component.css']
})
export class TruckDialogComponent implements OnInit {

    truck: Truck = createEmptyTruck();

    isEdit: boolean;

    truckForm: FormGroup

    letter1: string;

    letter2: string;

    letter3: string;

    numbers: number;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<TruckDialogComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: Truck,
                private fb: FormBuilder,) {

        if (data) {
            this.isEdit = true;
            this.truck = data;
            const truckNumber = data.number.split(' ');
            this.letter1 = truckNumber[0];
            this.letter2 = truckNumber[1];
            this.letter3 = truckNumber[2];
            this.numbers = Number(truckNumber[3]);
        }
    }

    ngOnInit(): void {
        this.truckForm = this.fb.group({
            name: [this.truck.number, []],
            balance: [this.truck.balance, []]
        });
    }

    save(): void {
        this.truck.number = this.letter1 + ' ' + this.letter2 + ' ' + this.letter3 + ' ' + this.numbers;
        if (this.isEdit) {
            this.apiService.updateTruck(this.truck).subscribe({
                next: (): void => {
                    Helper.snackbar(Helper.translateKey('UPDATE_TRUCK_SUCCESS'), this.snackbar);
                    this.cancel(true);
                },
                error: (): void => Helper.snackbar(Helper.translateKey('UPDATE_TRUCK_ERROR'), this.snackbar)
            });
        } else {
            this.apiService.createTruck(this.truck).subscribe({
                next: (): void => {
                    Helper.snackbar(Helper.translateKey('SAVE_TRUCK_SUCCESS'), this.snackbar);
                    this.cancel(true);
                },
                error: (): void => Helper.snackbar(Helper.translateKey('SAVE_TRUCK_ERROR'), this.snackbar)
            });
        }
    }

    cancel(result: boolean): void {
        this.dialogRef.close(result);
    }

    protected readonly Helper = Helper;

}
