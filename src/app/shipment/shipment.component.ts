import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {PageableResponse} from '../models/response.model';
import {Helper} from '../util/helper.util';
import {ApiService} from '../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Shipment} from '../models/shipment.model';
import {MatTableDataSource} from '@angular/material/table';
import {createEmptyExpense, Expense} from '../models/expense.model';
import {ExpenseDialogComponent} from './expense-dialog/expense-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ShipmentComponent implements OnInit {

    header = ['id', 'billNumber', 'truckNumber', 'revenue', 'actions'];

    expensesHeader = ['amount', 'notes', 'actions'];

    expandedElement: Shipment[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Shipment>;

    pageNo: number = 0;

    pageSize: number = 5;

    sortBy: string = 'id';

    order: string = 'asc';

    search: string = '';

    constructor(private apiService: ApiService, private snackbar: MatSnackBar, public translate: TranslateService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    getData(number: string, pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getShipments(number, pageNo, pageSize, sortBy, order).subscribe({
            next: (res: PageableResponse<Shipment>) => this.populateTable(res),
            error: () => Helper.snackbar(Helper.translateKey('RETRIEVE_EXPENSE_ERROR'), this.snackbar)
        });
    }

    populateTable(data: PageableResponse<Shipment>): void {
        this.dataSource = new MatTableDataSource<Shipment>(data.content);
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

    addExpenses(id: number): void {
        const expense = createEmptyExpense();
        expense.shipment.id = id;

        const dialogRef = this.dialog.open(ExpenseDialogComponent, {
            data: expense,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    editExpenses(row: Expense): void {
        const dialogRef = this.dialog.open(ExpenseDialogComponent, {
            data: row,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    removeExpense(row: Expense): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_EXPENSE_TITLE'),
                body: Helper.translateKey('DELETE_EXPENSE_BODY')
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteExpense(row.id).subscribe({
                    next: (): void => {
                        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                        Helper.snackbar(Helper.translateKey('DELETE_EXPENSE_SUCCESS'), this.snackbar);
                    },
                    error: (): void => Helper.snackbar(Helper.translateKey('DELETE_EXPENSE_ERROR'), this.snackbar)
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
