import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, concat, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {Truck} from '../../models/truck.model';

@Component({
    selector: 'truck-loader',
    templateUrl: './truck-loader.component.html',
    styleUrls: ['./truck-loader.component.css']
})
export class TruckLoaderComponent implements OnInit {

    @Input() truck: Truck;

    @Output() changeTruck: EventEmitter<Truck> = new EventEmitter<Truck>();

    loadingTrucks: boolean;

    truckSearch: Observable<Truck[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        if (this.truck.number && this.truck.number.length > 0) {
            this.truckSearch = this.search(this.truck.number);
        }
    }

    loadTrucks(event: Event): void {
        const name = event.target['value'];
        if (name.length > 0) {
            this.truckSearch = this.search(name);
        }
    }

    changeValue(truck: Truck): void {
        this.changeTruck.emit(truck);
    }

    search(number: string): Observable<Truck[]> {
        return concat(
                of([]),
                this.apiService.searchTrucks(number).pipe(
                        catchError(() => of([])),
                        tap((): boolean => this.loadingTrucks = false)
                )
        );
    }

}
