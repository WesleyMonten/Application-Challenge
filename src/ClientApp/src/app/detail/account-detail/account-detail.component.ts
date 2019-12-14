import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { DatePipe } from '@angular/common';
import { ReviewService } from 'src/app/services/review.service';
import { ApplicantReview } from 'src/app/models/applicant-review.model';
import { Assignment } from 'src/app/models/assignment.model';
import { Company } from 'src/app/models/company.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog } from '@angular/material';
import { AccountDeleteComponent } from 'src/app/delete/account-delete/account-delete.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  reviews: ApplicantReview[];
  assignments: Assignment[] = [];
  assignmentStartDates: string[] = [];
  assignmentEndDates: string[] = [];
  companies: Company[] = [];
  dateOfBirth: string;

  constructor(private _accountService: AccountService, private _reviewService: ReviewService, private _assignmentService: AssignmentService, private _companyService: CompanyService, private route: ActivatedRoute, public datepipe: DatePipe, public dialog: MatDialog) { }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getAccount(id.toString());
    })
  }

  getAccount(accountId: string) {
    this._accountService.get(accountId).subscribe(res => {
      this.account = res;
      this.dateOfBirth = this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy');
      this.getReviewsOfApplicant(accountId);
    });
  }

  getReviewsOfApplicant(accountId: string) {
    this._reviewService.getReviewsApplicant(accountId).subscribe(res => {
      this.reviews = res;
      this.getAssignmentsOfReviews(res);
      this.getCompaniesOfReviews(res);
      console.log(this.reviews);
    });
  }

  getAssignmentsOfReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getAssigmentOfReview(r.assignmentId);
    })
    console.log(this.assignments);
  }

  getCompaniesOfReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getCompanyOfReview(r.companyId);
    })
    console.log(this.companies);
  }

  getAssigmentOfReview(assignmentId: string) {
    this._assignmentService.getAssignment(assignmentId).subscribe(res => {
      this.assignmentEndDates.push(this.datepipe.transform(res.endTime, 'MM/dd/yyyy'));
      this.assignmentStartDates.push(this.datepipe.transform(res.startTime, 'MM/dd/yyyy'));
      this.assignments.push(res);
    });
  }

  getCompanyOfReview(companyId: string) {
    this._companyService.getCompany(companyId).subscribe(res => {
      this.companies.push(res);
    })
  }

  openDialog(): void {
    this.dialog.open(AccountDeleteComponent, {
      width: '400px',
      data: { accountId: this.account.accountId, nickname: this.account.nickname }
    });
  }

  ngOnInit() {
    this.getIdFromParameter();
  }
}
