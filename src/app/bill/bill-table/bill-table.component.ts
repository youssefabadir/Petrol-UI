import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {BillDialogComponent} from '../bill-dialog/bill-dialog.component';
import {Helper} from '../../util/helper.util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sort} from '@angular/material/sort';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {PageableResponse} from '../../models/response.model';
import {Bill} from '../../models/bill.model';

@Component({
    selector: 'transaction-table',
    templateUrl: './bill-table.component.html',
    styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Bill>;

    header = ['number', 'supplier', 'customer', 'quantity', 'supplierAmount', 'product', 'date', 'actions'];

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'date'

    order: string = 'desc'

    search: string = '';

    startDate: Date;

    endDate: Date;

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    getData(number: string = '', pageNo: number, pageSize: number,
            sortBy: string, order: string, start: Date, end: Date): void {
        this.apiService.getBills(number, pageNo, pageSize, sortBy, order,
                Helper.changeDateFormat(start), Helper.changeDateFormat(end)).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_BILLS_ERROR'), this.snackbar)
        });
    }

    populateTable(data: PageableResponse<Bill>): void {
        this.dataSource = new MatTableDataSource<Bill>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    add(): void {
        const dialogRef = this.dialog.open(BillDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
            }
        });
    }

    remove(row: Bill): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_BILL_TITLE'),
                body: Helper.translateKey('DELETE_BILL_BODY', {number: row.number})
            }

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteBill(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_BILL_SUCCESS'), this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_BILL_ERROR'), this.snackbar);
                });
            }
        });
    }

    inputChange(event: Event): void {
        this.search = event.target['value'];
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
    }

    dateChange(): void {
        if (this.startDate && this.endDate) {
            this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        } else {
            this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, null, null);
        }
    }

    clearFilter(): void {
        if (this.search.length > 0 || this.startDate || this.endDate) {
            this.search = '';
            this.startDate = null;
            this.endDate = null;
            this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order, this.startDate, this.endDate);
        }
    }

    sortData(event: Sort): void {
        this.getData(this.search, this.pageNo, this.pageSize, event.active, event.direction, this.startDate, this.endDate);
    }
}
