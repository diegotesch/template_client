import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyMaskModule } from "ng2-currency-mask";
import {ConfirmationService, MessageService} from 'primeng/api';

import { PRIMENG_IMPORTS } from './primeng-imports';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
    imports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        CurrencyMaskModule
    ],
    providers: [
        ConfirmationService,
        MessageService
    ],
    exports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        CurrencyMaskModule,

        // Componentes compartilhados
        FormFieldErrorComponent
    ],
    declarations: [FormFieldErrorComponent]
})
export class SharedModule { }
