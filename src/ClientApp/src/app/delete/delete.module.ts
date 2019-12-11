import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ApplicantDeleteComponent } from './applicant-delete/applicant-delete.component';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';

@NgModule({
    declarations: [ApplicantDeleteComponent, CompanyDeleteComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class DeleteModule { }
