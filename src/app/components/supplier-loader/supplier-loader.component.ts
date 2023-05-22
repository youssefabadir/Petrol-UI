import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {Supplier} from '../../models/supplier.model';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'supplier-loader',
    templateUrl: './supplier-loader.component.html',
    styleUrls: ['./supplier-loader.component.css']
})
export class SupplierLoaderComponent implements OnInit {

    @Input() supplier: Supplier;

    @Output() changeSupplier: EventEmitter<Supplier> = new EventEmitter<Supplier>();

    loadingSuppliers: boolean;

    supplierSearch: Observable<Supplier[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        if (this.supplier.name && this.supplier.name.length > 0) {
            this.supplierSearch = this.search(this.supplier.name);
        }
    }

    loadSuppliers(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.supplierSearch = this.search(name);
        }
    }

    changeValue(supplier: Supplier): void {
        this.changeSupplier.emit(supplier);
    }

    search(name: string): Observable<Supplier[]> {
        return concat(
                of([]),
                this.apiService.searchSuppliers(name).pipe(
                        catchError(() => of([])),
                        tap(() => this.loadingSuppliers = false)
                )
        );
    }
}
