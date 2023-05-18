import {TranslateService} from '@ngx-translate/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CookieService} from 'ngx-cookie-service';
import {Helper} from './Helper.util';

export class PaginatorI18n {

    constructor(private readonly translate: TranslateService, private cookie: CookieService) {
        const cookieExists = this.cookie.check('language');
        if (cookieExists) {
            const currentLang = this.cookie.get('language');
            this.translate.use(currentLang);
            this.translate.currentLang = currentLang;
        } else {
            this.cookie.set('language', 'ar', new Date('3000-12-31'), '/');
        }
    }

    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = Helper.translateKey('ITEMS_PER_PAGE_LABEL')
        paginatorIntl.nextPageLabel = Helper.translateKey('NEXT_PAGE_LABEL')
        paginatorIntl.previousPageLabel = Helper.translateKey('PREVIOUS_PAGE_LABEL');
        paginatorIntl.firstPageLabel = Helper.translateKey('FIRST_PAGE_LABEL');
        paginatorIntl.lastPageLabel = Helper.translateKey('LAST_PAGE_LABEL');
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return Helper.translateKey('RANGE_PAGE_LABEL_1', {length});
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return Helper.translateKey('RANGE_PAGE_LABEL_2', {startIndex: startIndex + 1, endIndex, length});
    }
}