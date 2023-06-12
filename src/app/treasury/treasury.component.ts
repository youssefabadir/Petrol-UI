import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Helper} from '../util/helper.util';
import {PageableResponse} from '../models/response.model';
import {Sort} from '@angular/material/sort';
import {Payment} from '../models/payment.model';

@Component({
    selector: 'treasury',
    templateUrl: './treasury.component.html',
    styleUrls: ['./treasury.component.css']
})
export class TreasuryComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Payment>;

    header = ['number', 'amount', 'treasuryBalance', 'customer', 'paymentMethod', 'date'];

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id'

    order: string = 'asc'

    RegExp: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    startDate: Date;

    endDate: Date;

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getData(this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    getData(pageNo: number, pageSize: number, sortBy: string, order: string, start: Date, end: Date): void {
        this.apiService.getPayments(undefined, pageNo, pageSize, sortBy, order,
                Helper.changeDateFormat(start), Helper.changeDateFormat(end)).subscribe(res => {
            this.populateCustomerPaymentTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_TREASURY_ERROR'), this.snackbar)
        });
    }

    populateCustomerPaymentTable(data: PageableResponse<Payment>): void {
        this.dataSource = new MatTableDataSource<Payment>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    sortData(event: Sort): void {
        this.getData(this.pageNo, this.pageSize, event.active, event.direction, this.startDate, this.endDate);
    }

    dateChange(): void {
        if (this.startDate && this.endDate) {
            this.getData(this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        } else {
            this.getData(this.pageNo, this.pageSize, this.sortBy, this.order, null, null);
        }
    }

    clearFilter(): void {
        if (this.startDate || this.endDate) {
            this.startDate = null;
            this.endDate = null;

            this.getData(this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        }
    }

}
