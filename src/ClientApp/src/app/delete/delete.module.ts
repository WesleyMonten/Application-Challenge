import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccountDeleteComponent } from './account-delete/account-delete.component';

@NgModule({
    declarations: [AccountDeleteComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    entryComponents: [AccountDeleteComponent],
})
export class DeleteModule { }
