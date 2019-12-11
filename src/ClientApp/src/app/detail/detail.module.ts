import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CompanyDetailComponent, AssignmentDetailComponent, ReviewDetailComponent, ApplicantDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DetailModule { }
