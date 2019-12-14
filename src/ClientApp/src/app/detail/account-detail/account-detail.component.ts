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
import { CompanyReview } from 'src/app/models/company-review.model';
import { Observable } from 'rxjs';
import { CompanyDeleteComponent } from 'src/app/delete/company-delete/company-delete.component';
import { ChoiceDeleteComponent } from 'src/app/delete/choice-delete/choice-delete.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  applicantReviews: ApplicantReview[];
  companyReviews: CompanyReview[] = [];
  assignmentStartDates: string[] = [];
  assignmentEndDates: string[] = [];
  companiesApplicantReviews: Company[] = [];
  assignmentsApplicantReviews: Assignment[] = [];
  applicantsCompanyReviews: Account[] = [];
  assignmentsCompanyReviews: Assignment[] = [];
  dateOfBirth: string;

  constructor(private _accountService: AccountService, private _reviewService: ReviewService, private _assignmentService: AssignmentService, private _companyService: CompanyService, private route: ActivatedRoute, public datepipe: DatePipe, public dialog: MatDialog) {
    this._accountService.refreshProfile.subscribe(() => {
      this.ngOnInit();
    })
  }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getAccount(id.toString(), false);
    })
  }

  getAccount(accountID: string, companyReview: boolean) {
    this._accountService.get(accountID).subscribe(res => {
      if (companyReview) {
        this.applicantsCompanyReviews.push(res);
      } else {
        this.account = res;
        this.dateOfBirth = this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy');
        this.getApplicantReviews(accountID);
        if (this.account.company != null) {
          this.getCompanyReviews(this.account.company.companyID);
        }
      }
    });
  }


  getApplicantReviews(accountID: string) {
    this._reviewService.getApplicantReviews(accountID).subscribe(res => {
      this.applicantReviews = res;
      this.getAssignmentsOfApplicantReviews(res);
      this.getCompaniesOfApplicantReviews(res);
    });
  }


  getAssignmentsOfApplicantReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getAssigment(r.assignmentID, true);
    })
  }

  getCompaniesOfApplicantReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getCompany(r.companyID);
    })
  }


  getCompanyReviews(companyID: string) {
    this._reviewService.getCompanyReviews(companyID).subscribe(res => {
      this.companyReviews = res;
      this.getAssignmentsOfCompanyReviews(res);
      this.getApplicantsOfCompanyReviews(res);
    });
  }

  getAssignmentsOfCompanyReviews(reviews: CompanyReview[]) {
    reviews.forEach(r => {
      this.getAssigment(r.assignmentID, false);
    })
  }

  getApplicantsOfCompanyReviews(reviews: CompanyReview[]) {
    reviews.forEach(r => {
      this.getAccount(r.applicantID, true);
    })
  }

  getAssigment(assignmentID: string, applicantReview: boolean) {
    this._assignmentService.getAssignment(assignmentID).subscribe(res => {
      this.assignmentEndDates.push(this.datepipe.transform(res.endTime, 'MM/dd/yyyy'));
      this.assignmentStartDates.push(this.datepipe.transform(res.startTime, 'MM/dd/yyyy'));
      if (applicantReview) {
        this.assignmentsApplicantReviews.push(res);
      } else {
        this.assignmentsCompanyReviews.push(res);
      }
    });
  }

  getCompany(companyID: string) {
    this._companyService.getCompany(companyID).subscribe(res => {
      this.companiesApplicantReviews.push(res);
    })
  }

  openDialog() {
    if (this.account.company != null) {
      this.openChoiceDialog();
    } else {
      this.openAccountDialog();
    }
  }

  openChoiceDialog(): void {
    this.dialog.open(ChoiceDeleteComponent, {
      width: '400px',
      data: { accountID: this.account.accountID, nickname: this.account.nickname, companyID: this.account.company.companyID, name: this.account.company.name }
    });
  }

  openAccountDialog(): void {
    this.dialog.open(AccountDeleteComponent, {
      width: '400px',
      data: { accountID: this.account.accountID, nickname: this.account.nickname }
    });
  }

  ngOnInit() {
    this.getIdFromParameter();
  }
}
