import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {BillTableComponent} from '../../bill/bill-table/bill-table.component';
import {CustomerTableComponent} from '../../customer/customer-table/customer-table.component';
import {SupplierTableComponent} from '../../supplier/supplier-table/supplier-table.component';
import {ProductTableComponent} from '../../product/product-table/product-table.component';
import {PaymentMethodTableComponent} from '../../payment-method/payment-method-table/payment-method-table.component';
import {
    CustomerPaymentTableComponent
} from '../../customer-payment/customer-payment-table/customer-payment-table.component';
import {OwnerPaymentTableComponent} from '../../owner-payment/owner-payment-table/owner-payment-table.component';
import {DiscountTableComponent} from '../../discount/discount-table/discount-table.component';
import {TreasuryComponent} from '../../treasury/treasury.component';
import {ShipmentComponent} from '../../shipment/shipment.component';
import {TruckTableComponent} from '../../truck/truck-table/truck-table.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'bills', component: BillTableComponent},
    {path: 'customers', component: CustomerTableComponent},
    {path: 'suppliers', component: SupplierTableComponent},
    {path: 'products', component: ProductTableComponent},
    {path: 'payment-method', component: PaymentMethodTableComponent},
    {path: 'income', component: CustomerPaymentTableComponent},
    {path: 'expenses', component: OwnerPaymentTableComponent},
    {path: 'discount', component: DiscountTableComponent},
    {path: 'treasury', component: TreasuryComponent},
    {path: 'shipments', component: ShipmentComponent},
    {path: 'trucks', component: TruckTableComponent},
];
