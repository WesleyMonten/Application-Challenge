import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { DatePipe } from '@angular/common';
import { ReviewService } from 'src/app/services/review.service';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { MatDialog } from '@angular/material';
import { AccountDeleteComponent } from 'src/app/delete/account-delete/account-delete.component';
import { UserInfo } from "../../models/user-info";
import { UserInfoService } from "../../services/user-info.service";
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import { Review } from "../../models/review.model";
import { CommendationService } from 'src/app/services/commendation.service';
import { Commendation } from 'src/app/models/commendation.model';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: UserInfo;
  applicantReviews: Review[] = [];
  companyReviews: Review[] = [];
  assignmentStartDates: string[] = [];
  assignmentEndDates: string[] = [];
  companiesApplicantReviews: UserInfo[] = [];
  assignmentsApplicantReviews: Assignment[] = [];
  applicantsCompanyReviews: UserInfo[] = [];
  assignmentsCompanyReviews: Assignment[] = [];
  assignmentsAccount: Assignment[] = [];
  applicantCommendationsCount: number[] = [1, 2, 0, 4, 5]; // TODO: use real data
  companyCommendationsCount: number[] = [1, 3, 5];
  dateOfBirth: string;
  status: boolean;
  adminMode: boolean;
  applicantCommendations: Commendation[];
  companyCommendations: Commendation[];
  myAccount: boolean;


  constructor(private _userInfoService: UserInfoService, private _accountService: AccountService, private _reviewService: ReviewService, private _assignmentService: AssignmentService, private route: ActivatedRoute, public datepipe: DatePipe, public dialog: MatDialog, private _applicationService: ApplicationService, private _commendationService: CommendationService) {
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
      const id = params['id'];
      if (id == "me") {
        this.myAccount = true;
      } else {
        this.myAccount = false;
      }

      this.getAccount(id, false);
    })
  }

  getAccount(accountId: string, companyReview: boolean) {
    this._userInfoService.get(accountId).subscribe(res => {
      if (companyReview) {
        this.applicantsCompanyReviews.push(res);
      } else {
        this.account = res;
        this.dateOfBirth = this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy');
        this.getApplicationsOfAccount(accountId);
        this.getApplicantReviews(accountId);
        if (this.account.company != null) {
          this.getCompanyReviews(this.account.accountId);
        }
      }
      if (this.account.applicant != null) {
        this.status = this.account.applicant.available;
      }
    });
  }

  getApplicationsOfAccount(accountId: string) {
    this._applicationService.getApplicationsOfAccount(accountId).subscribe(res => {
      this.getAssignmentsOfAccount(res);
    })
  }

  getAssignmentsOfAccount(applications: Application[]) {
    this.assignmentsAccount = []
    applications.forEach(a => {
      this.getAssigment(a.assignmentId, false, true);
    })
  }

  getApplicantReviews(accountId: string) {
    this._reviewService.getApplicantReviews(accountId).subscribe(res => {
      this.applicantReviews = res;
      this.getAssignmentsOfApplicantReviews(res);
      this.getCompaniesOfApplicantReviews(res);
    });
  }


  getAssignmentsOfApplicantReviews(reviews: Review[]) {
    this.assignmentsApplicantReviews = [];
    reviews.forEach(r => {
      this.getAssigment(r.assignmentId, true, false);
    })
  }

  getCompaniesOfApplicantReviews(reviews: Review[]) {
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

  getAssignmentsOfCompanyReviews(reviews: Review[]) {
    reviews.forEach(r => {
      this.getAssigment(r.assignmentId, false, false);
    })
  }

  getApplicantsOfCompanyReviews(reviews: Review[]) {
    reviews.forEach(r => {
      this.getAccount(r.applicantId, true);
    })
  }

  getAssigment(assignmentId: string, applicantReview: boolean, assignmentList: boolean) {
    this._assignmentService.getAssignment(assignmentId).subscribe(res => {
      this.assignmentEndDates.push(this.datepipe.transform(res.endTime, 'MM/dd/yyyy'));
      this.assignmentStartDates.push(this.datepipe.transform(res.startTime, 'MM/dd/yyyy'));
      if (applicantReview) {
        this.assignmentsApplicantReviews.push(res);
      }

      if (applicantReview == false && assignmentList == false) {
        this.assignmentsCompanyReviews.push(res);
      }

      if (assignmentList) {
        this.assignmentsAccount.push(res);
      }
    });
  }

  getCompany(companyId: string) {
    this._userInfoService.get(companyId).subscribe(res => {
      this.companiesApplicantReviews.push(res);
    })
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
    this._commendationService.getApplicantCommendation().subscribe(res => {
      this.applicantCommendations = res;
    });
    this._commendationService.getCompanyCommendation().subscribe(res => {
      this.companyCommendations = res;
    });
  }
}
