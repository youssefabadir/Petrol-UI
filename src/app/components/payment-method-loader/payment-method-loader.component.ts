import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {PaymentMethod} from '../../models/paymentMethod.model';

@Component({
    selector: 'payment-method-loader',
    templateUrl: './payment-method-loader.component.html',
    styleUrls: ['./payment-method-loader.component.css']
})
export class PaymentMethodLoaderComponent implements OnInit {

    @Input() paymentMethodId: number;

    @Input() paymentMethodName: string;

    @Input() paymentMethodBalance: number;

    @Output() changePaymentMethod: EventEmitter<PaymentMethod> = new EventEmitter<PaymentMethod>();

    loadingPaymentMethods: boolean;

    paymentMethodSearch: Observable<PaymentMethod[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        if (this.paymentMethodName && this.paymentMethodName.length > 0) {
            this.paymentMethodSearch = this.search(this.paymentMethodName);
        }
    }

    loadPaymentMethods(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.paymentMethodSearch = this.search(name);
        }
    }

    changeValue(paymentMethod: PaymentMethod): void {
        this.changePaymentMethod.emit(paymentMethod);
    }

    search(name: string): Observable<PaymentMethod[]> {
        return concat(
                of([]),
                this.apiService.searchPaymentMethods(name).pipe(
                        catchError(() => of([])),
                        tap(() => this.loadingPaymentMethods = false)
                )
        );
    }
}
