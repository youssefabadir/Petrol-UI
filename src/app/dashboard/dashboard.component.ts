import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Helper} from '../util/helper.util';
import {PageableResponse} from '../models/response.model';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bill} from '../models/bill.model';
import {CustomerPayment} from '../models/customerPayment.model';
import {OwnerPayment} from '../models/ownerPayment.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChild('billPaginator') billPaginator: MatPaginator;

    @ViewChild('customerPaginator') customerPaymentPaginator: MatPaginator;

    @ViewChild('ownerPaginator') ownerPaymentPaginator: MatPaginator;

    billDataSource: MatTableDataSource<Bill>;

    customerPaymentDataSource: MatTableDataSource<CustomerPayment>;

    ownerPaymentDataSource: MatTableDataSource<OwnerPayment>;

    billHeader = ['number', 'quantity', 'supplier', 'customer', 'product', 'date'];

    customerPaymentHeader = ['number', 'amount', 'customer', 'paymentMethod', 'date'];

    ownerPaymentHeader = ['number', 'amount', 'supplier', 'paymentMethod', 'date'];

    billPageNo: number = 0;

    billPageSize: number = 5;

    billSortBy: string = 'date';

    billOrder: string = 'desc';

    customerPaymentPageNo: number = 0;

    customerPaymentPageSize: number = 5;

    customerPaymentSortBy: string = 'date';

    customerPaymentOrder: string = 'desc';

    ownerPaymentPageNo: number = 0;

    ownerPaymentPageSize: number = 5;

    ownerPaymentSortBy: string = 'date';

    ownerPaymentOrder: string = 'desc';

    RegExp: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.getBillData('', this.billPageNo, this.billPageSize, this.billSortBy, this.billOrder);

        this.getCustomerPaymentData('', this.customerPaymentPageNo, this.customerPaymentPageSize,
                this.customerPaymentSortBy, this.customerPaymentOrder);

        this.getOwnerPaymentData('', this.ownerPaymentPageNo, this.ownerPaymentPageSize,
                this.ownerPaymentSortBy, this.ownerPaymentOrder);
    }

    getBillData(number: string = '', pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getBills(number, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateBillTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_BILLS_ERROR'), this.snackbar)
        });
    }

    populateBillTable(data: PageableResponse<Bill>): void {
        this.billDataSource = new MatTableDataSource<Bill>(data.content);
        this.billPaginator.length = data.totalElements;
        this.billPaginator.pageSize = data.size;
    }

    billPageChange(event: PageEvent): void {
        this.billPageNo = event.pageIndex;
        this.billPageSize = event.pageSize;
        this.getBillData('', this.billPageNo, this.billPageSize, this.billSortBy, this.billOrder);
    }

    billSortData(event: Sort): void {
        this.getBillData('', this.billPageNo, this.billPageSize, event.active, event.direction);
    }

    getCustomerPaymentData(number: string = '', pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getCustomerPayments(number, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateCustomerPaymentTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_CUSTOMER_PAYMENT_ERROR'), this.snackbar)
        });
    }

    populateCustomerPaymentTable(data: PageableResponse<CustomerPayment>): void {
        this.customerPaymentDataSource = new MatTableDataSource<CustomerPayment>(data.content);
        this.customerPaymentPaginator.length = data.totalElements;
        this.customerPaymentPaginator.pageSize = data.size;
    }

    customerPaymentPageChange(event: PageEvent): void {
        this.customerPaymentPageNo = event.pageIndex;
        this.customerPaymentPageSize = event.pageSize;
        this.getCustomerPaymentData('', this.customerPaymentPageNo, this.customerPaymentPageSize,
                this.customerPaymentSortBy, this.customerPaymentOrder);
    }

    customerPaymentSortData(event: Sort): void {
        this.getCustomerPaymentData('', this.customerPaymentPageNo, this.customerPaymentPageSize, event.active, event.direction);
    }

    getOwnerPaymentData(number: string = '', pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getOwnerPayments(number, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateOwnerPaymentTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_OWNER_PAYMENT_ERROR'), this.snackbar)
        });
    }

    populateOwnerPaymentTable(data: PageableResponse<OwnerPayment>): void {
        this.ownerPaymentDataSource = new MatTableDataSource<OwnerPayment>(data.content);
        this.ownerPaymentPaginator.length = data.totalElements;
        this.ownerPaymentPaginator.pageSize = data.size;
    }

    ownerPaymentPageChange(event: PageEvent): void {
        this.ownerPaymentPageNo = event.pageIndex;
        this.ownerPaymentPageSize = event.pageSize;
        this.getOwnerPaymentData('', this.ownerPaymentPageNo, this.ownerPaymentPageSize,
                this.ownerPaymentSortBy, this.ownerPaymentOrder);
    }

    ownerPaymentSortData(event: Sort): void {
        this.getOwnerPaymentData('', this.ownerPaymentPageNo, this.ownerPaymentPageSize, event.active, event.direction);
    }
}
