import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    location: Location;

    constructor(location: Location, private translate: TranslateService,
                private dateAdapter: DateAdapter<Date>, private cookie: CookieService) {
        this.location = location;

        translate.setDefaultLang('ar');
        translate.use('ar');
        translate.currentLang = 'ar'
    }

    ngOnInit(): void {
        if (this.translate.currentLang === 'ar') {
            this.dateAdapter.setLocale('ar-eg');
        }
    }

    changeLang(): void {
        if (this.translate.currentLang === 'en') {
            this.translate.use('ar');
            this.translate.currentLang = 'ar';
            this.cookie.set('language', 'ar', undefined, '/');
            this.dateAdapter.setLocale('ar-eg');
        } else {
            this.translate.use('en');
            this.translate.currentLang = 'en';
            this.cookie.set('language', 'en', undefined, '/');
            this.dateAdapter.setLocale('en-us');
        }
    }
}
