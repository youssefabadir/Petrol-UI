import {Component, ElementRef, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
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

    mobile_menu_visible: any = 0;

    private toggleButton: any;

    private sidebarVisible: boolean;

    constructor(location: Location, private element: ElementRef, private router: Router, public translate: TranslateService,
                private dateAdapter: DateAdapter<Date>, private cookie: CookieService) {
        this.location = location;
        this.sidebarVisible = false;

        translate.setDefaultLang('ar');
        translate.use('ar');
        translate.currentLang = 'ar'
    }

    ngOnInit(): void {
        if (this.translate.currentLang === 'ar') {
            this.dateAdapter.setLocale('ar-eg');
        }

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe(() => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        const $layer = document.createElement('div');
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

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
