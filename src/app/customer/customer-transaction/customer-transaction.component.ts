import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Customer} from '../../models/customer.model';
import {Sort} from '@angular/material/sort';
import {PageableResponse} from '../../models/response.model';
import {CustomerTransaction} from '../../models/customer-transaction.model';
import {Helper} from '../../util/Helper.util';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'customer-transaction',
    templateUrl: './customer-transaction.component.html',
    styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<CustomerTransaction>;

    header = ['balance', 'paymentNumber', 'paymentAmount', 'transferredPayment',
        'paymentMethod', 'billNumber', 'billQuantity', 'billAmount', 'product', 'date'];

    customer: Customer = {id: null, name: ''}

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'transactionId'

    order: string = 'asc'

    startDate: Date;

    endDate: Date;

    constructor(private apiService: ApiService, private dialogRef: MatDialogRef<CustomerTransactionComponent>,
                private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any, public translate: TranslateService) {

        if (data.data) {
            this.customer = data.data;
        }
    }

    ngOnInit(): void {
        this.getData(this.customer.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    getData(id: number, pageNo: number, pageSize: number, sortBy: string,
            order: string, start: Date, end: Date): void {
        this.apiService.getCustomerTransactions(id, pageNo, pageSize,
                sortBy, order, Helper.changeDateFormat(start), Helper.changeDateFormat(end)).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_CUSTOMER_TRANSACTION_ERROR'), this.snackbar);
        });
    }

    populateTable(data: PageableResponse<CustomerTransaction>): void {
        this.dataSource = new MatTableDataSource<CustomerTransaction>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.customer.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    dateChange(): void {
        if (this.startDate && this.endDate) {
            this.getData(this.customer.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        } else {
            this.getData(this.customer.id, this.pageNo, this.pageSize, this.sortBy, this.order, null, null);
        }
    }

    sortData(event: Sort): void {
        this.getData(this.customer.id, this.pageNo, this.pageSize, event.active, event.direction, this.startDate, this.endDate);
    }

    clearFilter(): void {
        if (this.startDate || this.endDate) {
            this.startDate = null;
            this.endDate = null;

            this.getData(this.customer.id, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

}
