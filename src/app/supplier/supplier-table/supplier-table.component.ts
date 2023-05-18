import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Supplier} from '../../models/supplier.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SupplierDialogComponent} from '../supplier-dialog/supplier-dialog.component';
import {Sort} from '@angular/material/sort';
import {Helper} from '../../util/Helper.util';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {PageableResponse} from '../../models/response.model';
import {TranslateService} from '@ngx-translate/core';
import {SupplierTransactionComponent} from '../supplier-transaction/supplier-transaction.component';

@Component({
    selector: 'supplier-table',
    templateUrl: './supplier-table.component.html',
    styleUrls: ['./supplier-table.component.css']
})
export class SupplierTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Supplier>

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
        this.apiService.getSuppliers(name, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar('Error while retrieving suppliers', this.snackbar);
        });
    }

    populateTable(data: PageableResponse<Supplier>): void {
        this.dataSource = new MatTableDataSource<Supplier>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(SupplierDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    view(supplier: Supplier): void {
        const data = new MatDialogConfig();
        data.width = '2000px';
        data.maxHeight = '650px';
        data.data = {data: supplier, panelClass: 'view-dialog'};

        this.dialog.open(SupplierTransactionComponent, data);
    }

    edit(supplier: Supplier): void {
        const dialogRef = this.dialog.open(SupplierDialogComponent, {data: supplier});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: Supplier): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete Supplier',
                body: 'Do you want to delete supplier ' + row.name + '?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteSupplier(row.id).subscribe(() => {
                    Helper.snackbar('Supplier has been deleted successfully', this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar('Error while deleting supplier', this.snackbar);
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
