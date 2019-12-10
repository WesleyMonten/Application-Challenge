import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantEditComponent } from './applicant-edit/applicant-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ApplicantEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditModule { }
