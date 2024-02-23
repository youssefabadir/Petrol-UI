import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Customer} from '../../models/customer.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomerDialogComponent} from '../customer-dialog/customer-dialog.component';
import {CustomerTransactionComponent} from '../customer-transaction/customer-transaction.component';
import {Sort} from '@angular/material/sort';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'customer-table',
    templateUrl: './customer-table.component.html',
    styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Customer>

    header = ['id', 'name', 'balance', 'actions']

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id';

    order: string = 'asc';

    search: string = '';

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(name: string, pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getCustomers(name, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_CUSTOMER_ERROR'), this.snackbar);
        });
    }

    populateTable(data: PageableResponse<Customer>): void {
        this.dataSource = new MatTableDataSource<Customer>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(CustomerDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    view(customer: Customer): void {
        const data = new MatDialogConfig();
        data.width = '2000px';
        data.height = '700px';
        data.data = {data: customer, panelClass: 'view-dialog'};

        this.dialog.open(CustomerTransactionComponent, data);

    }

    edit(customer: Customer): void {
        const dialogRef = this.dialog.open(CustomerDialogComponent,
                {
                    data: customer,
                });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: Customer): void {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_CUSTOMER'),
                body: Helper.translateKey('DELETE_CUSTOMER_BODY', {name: row.name})
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteCustomer(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_CUSTOMER_SUCCESS'), this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_CUSTOMER_ERROR'), this.snackbar);
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
