import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Helper} from './util/Helper.util';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public translate: TranslateService) {
        translate.setDefaultLang('ar');
        translate.use('ar');
        translate.currentLang = 'ar'
        new Helper(translate);
    }
}
