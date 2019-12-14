import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import { Location } from '@angular/common';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignment-applications',
  templateUrl: './assignment-applications.component.html',
  styleUrls: ['./assignment-applications.component.scss']
})
export class AssignmentApplicationsComponent implements OnInit {

  applications: Application[];
  applicants: Account[] = [];
  closed: boolean;

  constructor(private route: ActivatedRoute, private _applicationService: ApplicationService, private _location: Location, private _accountService: AccountService, private _assignmentService: AssignmentService) {
    this._applicationService.isClosed.subscribe(e => {
      this.closed = e;
    })
  }

  goBack() {
    this._location.back();
  }

  cancel(assignmentID: string) {
    this._assignmentService.cancel(assignmentID).subscribe(res => {
      this._assignmentService.refreshBoard.next(true);
      this.goBack();
    })
  }

  choose(applicationID: string) {
    this._applicationService.choose(applicationID).subscribe(res => {
      this._assignmentService.setApplicationOnAssignment(res.assignmentID, res.applicationID).subscribe(res => {
        console.log(res);
        this._assignmentService.refreshBoard.next(true);
        this.goBack();
      });
    })
  }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getApplicationsAssignment(id.toString());
    })
  }

  getApplicationsAssignment(assignmentID: string) {
    this._applicationService.getApplicationsAssignment(assignmentID).subscribe(res => {
      this.applications = res;
      this.getApplicantsOfApplications(res);
    });
  }

  getApplicantsOfApplications(applications: Application[]) {
    applications.forEach(a => {
      this.getApplicantOfApplication(a.applicantID);
    });
  }

  getApplicantOfApplication(applicantID: string) {
    this._accountService.get(applicantID).subscribe(res => {
      this.applicants.push(res);
    })
  }

  ngOnInit() {
    this.getIdFromParameter();
  }

}
