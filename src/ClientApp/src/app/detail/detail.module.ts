import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicantDeleteComponent } from '../delete/applicant-delete/applicant-delete.component';
import { AppRoutingModule } from '../app-routing.module';
import { CompanyDeleteComponent } from '../delete/company-delete/company-delete.component';

@NgModule({
  declarations: [CompanyDetailComponent, AssignmentDetailComponent, ReviewDetailComponent, ApplicantDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents: [ApplicantDeleteComponent, CompanyDeleteComponent],
})
export class DetailModule { }
