import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';

@NgModule({
  declarations: [StudentDetailComponent, CompanyDetailComponent, AssignmentDetailComponent, ReviewDetailComponent, ApplicantDetailComponent],
  imports: [
    CommonModule
  ]
})
export class DetailModule { }
