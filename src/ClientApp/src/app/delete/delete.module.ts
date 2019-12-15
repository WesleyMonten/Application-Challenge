import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';
import { ChoiceDeleteComponent } from './choice-delete/choice-delete.component';

@NgModule({
    declarations: [AccountDeleteComponent, CompanyDeleteComponent, ChoiceDeleteComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    entryComponents: [AccountDeleteComponent, CompanyDeleteComponent],
})
export class DeleteModule { }
