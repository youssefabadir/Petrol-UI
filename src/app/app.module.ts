import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {MatIconModule} from '@angular/material/icon';
import {CustomerTableComponent} from './customer/customer-table/customer-table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SupplierTableComponent} from './supplier/supplier-table/supplier-table.component';
import {ProductTableComponent} from './product/product-table/product-table.component';
import {BillDialogComponent} from './bill/bill-dialog/bill-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CustomerDialogComponent} from './customer/customer-dialog/customer-dialog.component';
import {SupplierDialogComponent} from './supplier/supplier-dialog/supplier-dialog.component';
import {ProductDialogComponent} from './product/product-dialog/product-dialog.component';
import {CustomerTransactionComponent} from './customer/customer-transaction/customer-transaction.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {PaymentMethodTableComponent} from './payment-method/payment-method-table/payment-method-table.component';
import {
    CustomerPaymentTableComponent
} from './customer-payment/customer-payment-table/customer-payment-table.component';
import {OwnerPaymentTableComponent} from './owner-payment/owner-payment-table/owner-payment-table.component';
import {PaymentMethodDialogComponent} from './payment-method/payment-method-dialog/payment-method-dialog.component';
import {
    CustomerPaymentDialogComponent
} from './customer-payment/custmer-payment-dialog/customer-payment-dialog.component';
import {OwnerPaymentDialogComponent} from './owner-payment/owner-payment-dialog/owner-payment-dialog.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PaginatorI18n} from './util/PaginatorI18n';
import {CookieService} from 'ngx-cookie-service';
import {SupplierTransactionComponent} from './supplier/supplier-transaction/supplier-transaction.component';
import {DiscountTableComponent} from './discount/discount-table/discount-table.component';
import {DiscountDialogComponent} from './discount/discount-dialog/discount-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        NgSelectModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatCheckboxModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        CustomerTableComponent,
        SupplierTableComponent,
        ProductTableComponent,
        BillDialogComponent,
        CustomerDialogComponent,
        SupplierDialogComponent,
        ProductDialogComponent,
        CustomerTransactionComponent,
        PaymentMethodTableComponent,
        CustomerPaymentTableComponent,
        OwnerPaymentTableComponent,
        PaymentMethodDialogComponent,
        CustomerPaymentDialogComponent,
        OwnerPaymentDialogComponent,
        SupplierTransactionComponent,
        DiscountTableComponent,
        DiscountDialogComponent,

    ],
    providers: [
        {
            provide: MatPaginatorIntl, deps: [TranslateService, CookieService],
            useFactory: (translateService: TranslateService, cookie: CookieService) => new PaginatorI18n(translateService, cookie).getPaginatorIntl()
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
