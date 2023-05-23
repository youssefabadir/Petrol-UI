import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

export class Helper {
    public static translate: TranslateService;

    constructor(private translateService: TranslateService) {
        Helper.translate = translateService;
    }

    public static snackbar(message: string, snackbar: MatSnackBar, duration: number = 5000): void {
        snackbar.open(message, '✖', {
            duration: duration,
            panelClass: ['snackbar']
        });
    }

    public static changeDateFormat(date: Date): string {
        if (date) {
            return date.toLocaleDateString('en-GB');
        } else {
            return '';
        }
    }

    public static translateKey(key: string, params?: any): string {
        let result;
        this.translate.get(key, params).subscribe(e => result = e);
        return result;
    }
}