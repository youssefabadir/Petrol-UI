import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Discount} from '../../models/discount.model';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Sort} from '@angular/material/sort';
import {DiscountDialogComponent} from '../discount-dialog/discount-dialog.component';

@Component({
    selector: 'discount-table',
    templateUrl: './discount-table.component.html',
    styleUrls: ['./discount-table.component.css']
})
export class DiscountTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Discount>

    header = ['id', 'discount', 'customerName', 'productName', 'actions']

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id';

    order: string = 'asc';

    customerName: string = '';

    productName: string = '';

    constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(customerName: string, productName: string, pageNo: number,
            pageSize: number, sortBy: string, order: string): void {
        this.apiService.getDiscounts(customerName, productName, pageNo,
                pageSize, sortBy, order).subscribe(res => {
            this.populateTable(res);
        }, () => {
            Helper.snackbar(Helper.translateKey('RETRIEVE_DISCOUNT_ERROR'), this.snackbar);
        });
    }

    populateTable(data: PageableResponse<Discount>): void {
        this.dataSource = new MatTableDataSource<Discount>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(DiscountDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerName = '';
                this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    edit(discount: Discount): void {
        const dialogRef = this.dialog.open(DiscountDialogComponent, {data: discount});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerName = '';
                this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: Discount): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_DISCOUNT_TITLE'),
                body: Helper.translateKey('DELETE_DISCOUNT_BODY', {
                    customerName: row.customerName,
                    productName: row.productName
                })
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteDiscount(row.id).subscribe(() => {
                    Helper.snackbar(Helper.translateKey('DELETE_DISCOUNT_SUCCESS'), this.snackbar);
                    this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
                }, () => {
                    Helper.snackbar(Helper.translateKey('DELETE_DISCOUNT_ERROR'), this.snackbar);
                });
            }
        });
    }

    customerFilter(event: Event): void {
        this.customerName = event.target['value'];
        this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    productFilter(event: Event): void {
        this.productName = event.target['value'];
        this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    sortData(event: Sort): void {
        this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, event.active, event.direction);
    }

    clearFilter(): void {
        if (this.customerName.length > 0 || this.productName.length > 0) {
            this.customerName = '';
            this.productName = '';
            this.getData(this.customerName, this.productName, this.pageNo, this.pageSize, this.sortBy, this.order);
        }
    }

}
