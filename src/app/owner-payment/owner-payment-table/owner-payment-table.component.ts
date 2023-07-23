import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {Sort} from '@angular/material/sort';
import {OwnerPayment} from '../../models/ownerPayment.model';
import {CustomerPayment} from '../../models/customerPayment.model';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {OwnerPaymentDialogComponent} from '../owner-payment-dialog/owner-payment-dialog.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'owner-payment',
    templateUrl: './owner-payment-table.component.html',
    styleUrls: ['./owner-payment-table.component.css']
})
export class OwnerPaymentTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<OwnerPayment>;

    header = ['number', 'amount', 'supplier', 'paymentMethod', 'date', 'note', 'actions'];

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id'

    order: string = 'asc'

    search: string = '';

    RegExp: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(number: string = '', pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getOwnerPayments(number, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateCustomerPaymentTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_OWNER_PAYMENT_ERROR'), this.snackbar)
        });
    }

    populateCustomerPaymentTable(data: PageableResponse<OwnerPayment>): void {
        this.dataSource = new MatTableDataSource<OwnerPayment>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    sortData(event: Sort): void {
        this.getData(this.search, this.pageNo, this.pageSize, event.active, event.direction);
    }

    add(): void {
        const dialogRef = this.dialog.open(OwnerPaymentDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: CustomerPayment): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_BILL_TITLE'),
                body: Helper.translateKey('DELETE_OWNER_PAYMENT_BODY', {number: this.RegExp.test(row.number) ? '' : row.number})
            }

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteOwnerPayment(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_OWNER_PAYMENT_SUCCESS'), this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_OWNER_PAYMENT_ERROR'), this.snackbar);
                });
            }
        });
    }

    inputChange(event: Event): void {
        this.search = event.target['value'];
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    clearFilter(): void {
        if (this.search.length > 0) {
            this.search = '';
            this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
        }
    }

}
