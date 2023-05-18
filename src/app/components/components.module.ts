import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTreeModule,
        MdbCollapseModule,
        TranslateModule,
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        ConfirmDialogComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        ConfirmDialogComponent
    ]
})
export class ComponentsModule {
}
