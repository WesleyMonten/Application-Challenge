import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicantDeleteComponent } from '../delete/applicant-delete/applicant-delete.component';
import { AppRoutingModule } from '../app-routing.module';
import { CompanyDeleteComponent } from '../delete/company-delete/company-delete.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

@NgModule({
  declarations: [AssignmentDetailComponent, ReviewDetailComponent, AccountDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents: [ApplicantDeleteComponent, CompanyDeleteComponent],
  providers: [DatePipe]
})
export class DetailModule { }
