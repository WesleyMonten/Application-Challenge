import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantEditComponent } from './applicant-edit/applicant-edit.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyEditComponent } from './company-edit/company-edit.component';

@NgModule({
  declarations: [ApplicantEditComponent, CompanyEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditModule { }
