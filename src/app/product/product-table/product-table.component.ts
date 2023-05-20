import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Product} from '../../models/product.model';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {Sort} from '@angular/material/sort';
import {Helper} from '../../util/Helper.util';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {PageableResponse} from '../../models/response.model';

@Component({
    selector: 'product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Product>

    header = ['id', 'name', 'price', 'actions']

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id';

    order: string = 'asc';

    search: string = '';

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(name: string = '', pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getProducts(name, pageNo, pageSize, sortBy, order).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_PRODUCT_ERROR'), this.snackbar)
        });
    }

    populateTable(data: PageableResponse<Product>): void {
        this.dataSource = new MatTableDataSource<Product>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(ProductDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    edit(product: Product): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {data: product});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: Product): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_PRODUCT_TITLE'),
                body: Helper.translateKey('DELETE_PRODUCT_BODY', {name: row.name})
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteProduct(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_PRODUCT_SUCCESS'), this.snackbar);
                    this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_PRODUCT_ERROR'), this.snackbar);
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
