import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {Product} from '../../models/product.model';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'product-loader',
    templateUrl: './product-loader.component.html',
    styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

    @Input() product: Product;

    @Output() changeProduct: EventEmitter<Product> = new EventEmitter<Product>();

    loadingProducts: boolean;

    productSearch: Observable<Product[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        if (this.product.name && this.product.name.length > 0) {
            this.productSearch = this.search(this.product.name);
        }
    }

    loadProducts(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.productSearch = this.search(name);
        }
    }

    changeValue(product: Product): void {
        this.changeProduct.emit(product);
    }

    search(name: string): Observable<Product[]> {
        return concat(
                of([]),
                this.apiService.searchProducts(name).pipe(
                        catchError(() => of([])),
                        tap((): boolean => this.loadingProducts = false)
                )
        );
    }
}
