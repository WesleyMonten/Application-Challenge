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

  constructor(private _accountService: AccountService, private _reviewService: ReviewService, private _assignmentService: AssignmentService, private _companyService: CompanyService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getAccount(id.toString());
    })
  }

  getAccount(accountID: string) {
    this._accountService.get(accountID).subscribe(res => {
      this.account = res;
      this.dateOfBirth = this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy');
      this.getReviewsOfApplicant(accountID);
    });
  }

  getReviewsOfApplicant(accountID: string) {
    this._reviewService.getReviewsApplicant(accountID).subscribe(res => {
      this.reviews = res;
      this.getAssignmentsOfReviews(res);
      this.getCompaniesOfReviews(res);
      console.log(this.reviews);
    });
  }

  getAssignmentsOfReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getAssigmentOfReview(r.assignmentID);
    })
    console.log(this.assignments);
  }

  getCompaniesOfReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getCompanyOfReview(r.companyID);
    })
    console.log(this.companies);
  }

  getAssigmentOfReview(assignmentID: string) {
    this._assignmentService.getAssignment(assignmentID).subscribe(res => {
      this.assignmentEndDates.push(this.datepipe.transform(res.endTime, 'MM/dd/yyyy'));
      this.assignmentStartDates.push(this.datepipe.transform(res.startTime, 'MM/dd/yyyy'));
      this.assignments.push(res);
    });
  }

  getCompanyOfReview(companyID: string) {
    this._companyService.getCompany(companyID).subscribe(res => {
      this.companies.push(res);
    })
  }

  ngOnInit() {
    this.getIdFromParameter();
  }
}
