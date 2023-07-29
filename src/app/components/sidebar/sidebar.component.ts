import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

declare interface RouteInfo {
    path: string;

    title: string;

    icon: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'DASHBOARD', icon: 'dashboard'},
    {path: '/bills', title: 'BILLS', icon: 'receipt'},
    {path: '/income', title: 'INCOME', icon: 'trending_up'},
    {path: '/expenses', title: 'EXPENSES', icon: 'trending_down'},
    {path: '/customers', title: 'CUSTOMERS', icon: 'group'},
    {path: '/suppliers', title: 'SUPPLIERS', icon: 'local_shipping'},
    // {path: '/treasury', title: 'TREASURY', icon: 'attach_money'},
    {path: '/payment-method', title: 'PAYMENT_METHOD', icon: 'account_balance'},
    {path: '/products', title: 'PRODUCTS', icon: 'inventory_2'},
    {path: '/discount', title: 'DISCOUNT', icon: 'swap_vert'}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.menuItems = ROUTES;
    }
}
