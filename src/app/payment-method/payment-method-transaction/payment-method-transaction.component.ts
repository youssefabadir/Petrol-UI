import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {Sort} from '@angular/material/sort';
import {createEmptyPaymentMethod, PaymentMethod} from '../../models/paymentMethod.model';
import {Payment} from '../../models/payment.model';

@Component({
    selector: 'payment-method-transaction',
    templateUrl: './payment-method-transaction.component.html',
    styleUrls: ['./payment-method-transaction.component.css']
})
export class PaymentMethodTransactionComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Payment>;

    header = ['paymentNumber', 'paymentAmount', 'paymentMethodName', 'paymentMethodBalance', 'customer', 'supplier', 'date'];

    paymentMethod: PaymentMethod = createEmptyPaymentMethod();

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id'

    order: string = 'asc'

    startDate: Date;

    endDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<PaymentMethodTransactionComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any, public translate: TranslateService) {

        if (data.data) {
            this.paymentMethod = data.data;
        }
    }

    ngOnInit(): void {
        this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    getData(paymentMethodId: number, pageNo: number, pageSize: number, sortBy: string,
            order: string, start: Date, end: Date): void {
        this.apiService.getPayments(paymentMethodId, pageNo, pageSize,
                sortBy, order, Helper.changeDateFormat(start), Helper.changeDateFormat(end)).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_PAYMENTS_ERROR'), this.snackbar);
        });
    }

    populateTable(data: PageableResponse<Payment>): void {
        this.dataSource = new MatTableDataSource<Payment>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    dateChange(): void {
        if (this.startDate && this.endDate) {
            this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        } else {
            this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, this.sortBy, this.order, null, null);
        }
    }

    sortData(event: Sort): void {
        this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, event.active, event.direction, this.startDate, this.endDate);
    }

    clearFilter(): void {
        if (this.startDate || this.endDate) {
            this.startDate = null;
            this.endDate = null;

            this.getData(this.paymentMethod.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

}
