import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Helper} from '../../util/helper.util';
import {PageableResponse} from '../../models/response.model';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Sort} from '@angular/material/sort';
import {Truck} from '../../models/truck.model';
import {TruckDialogComponent} from '../truck-dialog/truck-dialog.component';

@Component({
    selector: 'truck-table',
    templateUrl: './truck-table.component.html',
    styleUrls: ['./truck-table.component.css']
})
export class TruckTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: MatTableDataSource<Truck>

    header = ['id', 'number', 'balance', 'actions']

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

    getData(number: string, pageNo: number, pageSize: number, sortBy: string, order: string): void {
        this.apiService.getTrucks(number, pageNo, pageSize, sortBy, order).subscribe({
            next: (res: PageableResponse<Truck>) => this.populateTable(res),
            error: () => Helper.snackbar(Helper.translateKey('RETRIEVE_CUSTOMER_ERROR'), this.snackbar)
        });
    }

    populateTable(data: PageableResponse<Truck>): void {
        this.dataSource = new MatTableDataSource<Truck>(data.content);
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = data.size;
    }

    pageChange(event: PageEvent): void {
        this.pageNo = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
    }

    add(): void {
        const dialogRef = this.dialog.open(TruckDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    /*view(customer: Truck): void {
        const data = new MatDialogConfig();
        data.width = '2000px';
        data.height = '650px';
        data.data = {data: customer, panelClass: 'view-dialog'};

        this.dialog.open(CustomerTransactionComponent, data);

    }*/

    edit(truck: Truck): void {
        const dialogRef = this.dialog.open(TruckDialogComponent,
                {
                    data: truck,
                });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search = '';
                this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
            }
        });
    }

    remove(row: Truck): void {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: Helper.translateKey('DELETE_TRUCK'),
                body: Helper.translateKey('DELETE_TRUCK_BODY', {name: row.number})
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteTruck(row.id).subscribe({
                    next: (): void => {
                        Helper.snackbar(Helper.translateKey('DELETE_TRUCK_SUCCESS'), this.snackbar);
                        this.getData(this.search, this.pageNo, this.pageSize, this.sortBy, this.order);
                    },
                    error: () => Helper.snackbar(Helper.translateKey('DELETE_TRUCK_ERROR'), this.snackbar)
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
