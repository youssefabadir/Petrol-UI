import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {Customer} from '../../models/customer.model';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'customer-loader',
    templateUrl: './customer-loader.component.html',
    styleUrls: ['./customer-loader.component.css']
})
export class CustomerLoaderComponent implements OnInit {

    @Input() customer: Customer;

    @Output() changeCustomer: EventEmitter<Customer> = new EventEmitter<Customer>();

    loadingCustomers: boolean;

    customerSearch: Observable<Customer[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        if (this.customer.name && this.customer.name.length > 0) {
            this.customerSearch = this.search(this.customer.name);
        }
    }

    loadCustomers(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.customerSearch = this.search(name);
        }
    }

    changeValue(customer: Customer): void {
        this.changeCustomer.emit(customer);
    }

    search(name: string): Observable<Customer[]> {
        return concat(
                of([]),
                this.apiService.searchCustomers(name).pipe(
                        catchError(() => of([])),
                        tap(() => this.loadingCustomers = false)
                )
        );
    }
}
