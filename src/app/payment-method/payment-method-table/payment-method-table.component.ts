import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Sort} from '@angular/material/sort';
import {PaymentMethod} from '../../models/paymentMethod.model';
import {PaymentMethodDialogComponent} from '../payment-method-dialog/payment-method-dialog.component';
import {PaymentMethodTransactionComponent} from '../payment-method-transaction/payment-method-transaction.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'payment-method-table',
    templateUrl: './payment-method-table.component.html',
    styleUrls: ['./payment-method-table.component.css']
})
export class PaymentMethodTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<PaymentMethod>

    header = ['id', 'name', 'balance', 'actions']

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id';

    order: string = 'asc';

    search: string = '';

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar, public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(name: string, pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getPaymentMethods(name, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_PAYMENT_METHOD_ERROR'), this.snackbar);
        });
    }

    populateTable(data: PageableResponse<PaymentMethod>): void {
        this.dataSource = new MatTableDataSource<PaymentMethod>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(PaymentMethodDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    view(paymentMethod: PaymentMethod): void {
        const data = new MatDialogConfig();
        data.width = '2000px';
        data.height = '680px';
        data.data = {data: paymentMethod, panelClass: 'view-dialog'};

        this.dialog.open(PaymentMethodTransactionComponent, data);
    }

    edit(paymentMethod: PaymentMethod): void {
        const dialogRef = this.dialog.open(PaymentMethodDialogComponent,
                {data: paymentMethod});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: PaymentMethod): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_PAYMENT_METHOD_TITLE'),
                body: Helper.translateKey('DELETE_PAYMENT_METHOD_BODY', {name: row.name})
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deletePaymentMethod(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_PAYMENT_METHOD_SUCCESS'), this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_PAYMENT_METHOD_ERROR'), this.snackbar);
                });
            }
        });
    }

    inputChange(event: Event): void {
        this.search = event.target['value'];
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    sortData(event: Sort): void {
        this.getData(this.search, this.pageNo, this.pageSize, event.active, event.direction);
    }

    clearFilter(): void {
        if (this.search.length > 0) {
            this.search = '';
            this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
        }
    }

}
