import { Component, OnInit, Input } from '@angular/core';
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
import { ChoiceDeleteComponent } from 'src/app/delete/choice-delete/choice-delete.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  applicantReviews: ApplicantReview[] = [];
  companyReviews: CompanyReview[] = [];
  assignmentStartDates: string[] = [];
  assignmentEndDates: string[] = [];
  companiesApplicantReviews: Company[] = [];
  assignmentsApplicantReviews: Assignment[] = [];
  applicantsCompanyReviews: Account[] = [];
  assignmentsCompanyReviews: Assignment[] = [];
  dateOfBirth: string;
  status: boolean;
  adminMode: boolean;

  constructor(private _accountService: AccountService, private _reviewService: ReviewService, private _assignmentService: AssignmentService, private _companyService: CompanyService, private route: ActivatedRoute, public datepipe: DatePipe, public dialog: MatDialog) {
    this._accountService.refreshProfile.subscribe(() => {
      if (localStorage.getItem("adminMode")) {
        this.adminMode = true;
      } else {
        this.adminMode = false;
      }
      this.ngOnInit();
    })
  }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getAccount(id.toString(), false);
    })
  }

  getAccount(accountId: string, companyReview: boolean) {
    this._accountService.get(accountId).subscribe(res => {
      if (companyReview) {
        this.applicantsCompanyReviews.push(res);
      } else {
        this.account = res;
        this.status = this.account.applicant.available;
        this.dateOfBirth = this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy');
        this.getApplicantReviews(accountId);
        if (this.account.company != null) {
          this.getCompanyReviews(this.account.company.companyId);
        }
      }
    });
  }


  getApplicantReviews(accountId: string) {
    this._reviewService.getApplicantReviews(accountId).subscribe(res => {
      this.applicantReviews = res;
      this.getAssignmentsOfApplicantReviews(res);
      this.getCompaniesOfApplicantReviews(res);
    });
  }


  getAssignmentsOfApplicantReviews(reviews: ApplicantReview[]) {
    this.assignmentsApplicantReviews = [];
    reviews.forEach(r => {
      this.getAssigment(r.assignmentId, true);
    })
  }

  getCompaniesOfApplicantReviews(reviews: ApplicantReview[]) {
    reviews.forEach(r => {
      this.getCompany(r.companyId);
    })
  }

  getCompanyReviews(companyId: string) {
    this._reviewService.getCompanyReviews(companyId).subscribe(res => {
      this.companyReviews = res;
      this.getAssignmentsOfCompanyReviews(res);
      this.getApplicantsOfCompanyReviews(res);
    });
  }

  getAssignmentsOfCompanyReviews(reviews: CompanyReview[]) {
    reviews.forEach(r => {
      this.getAssigment(r.assignmentId, false);
    })
  }

  getApplicantsOfCompanyReviews(reviews: CompanyReview[]) {
    reviews.forEach(r => {
      this.getAccount(r.applicantId, true);
    })
  }

  getAssigment(assignmentId: string, applicantReview: boolean) {
    this._assignmentService.getAssignment(assignmentId).subscribe(res => {
      this.assignmentEndDates.push(this.datepipe.transform(res.endTime, 'MM/dd/yyyy'));
      this.assignmentStartDates.push(this.datepipe.transform(res.startTime, 'MM/dd/yyyy'));
      if (applicantReview) {
        this.assignmentsApplicantReviews.push(res);
      } else {
        this.assignmentsCompanyReviews.push(res);
      }
    });
  }

  getCompany(companyId: string) {
    this._companyService.getCompany(companyId).subscribe(res => {
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
      data: { accountId: this.account.accountId, nickname: this.account.nickname, companyId: this.account.company.companyId, name: this.account.company.name }
    });
  }

  openAccountDialog(): void {
    this.dialog.open(AccountDeleteComponent, {
      width: '400px',
      data: { accountId: this.account.accountId, nickname: this.account.nickname }
    });
  }

  onChangeStatus() {
    this.status = !this.status;
    var account: Account;
    account.applicant.available = this.status;
    this._accountService.putStatus(account).subscribe(() => {
      this._accountService.refreshProfile.next(true);
    });
  }

  deleteAssignment(assignmentId: string) {
    console.log(assignmentId);
    this._assignmentService.delete(assignmentId).subscribe(res => {
      console.log(res);
      this._accountService.refreshProfile.next(true);
    })
  }

  deleteApplicantReview(reviewId: string) {
    this._reviewService.deleteApplicantReview(reviewId).subscribe(() => {
      this._accountService.refreshProfile.next(true);
    });
  }

  deleteCompanyReview(reviewId: string) {
    this._reviewService.deleteCompanyReview(reviewId).subscribe(() => {
      this._accountService.refreshProfile.next(true);
    });
  }

  ngOnInit() {
    this.getIdFromParameter();
  }
}
