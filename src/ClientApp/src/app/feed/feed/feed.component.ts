import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { SearchService } from 'src/app/services/search.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import { UserInfoService } from "../../services/user-info.service";
import { UserInfo } from "../../models/user-info";
import { AccountService } from "../../services/account.service";
import { Account } from 'src/app/models/account.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  account: Account;
  assignments: Assignment[];
  companies: UserInfo[] = [];
  liked: boolean = false;
  liked2: boolean = false;
  expanded: boolean = false;
  search: string;
  model: Application = new Application("", "", "", false);

  constructor(private _assignmentService: AssignmentService,
    private _searchService: SearchService, private _applicationService: ApplicationService, private _userInfoService: UserInfoService, private _accountService: AccountService, private _snackBar: MatSnackBar) {
    this._searchService.currentSearch.subscribe(result => {
      this.search = result;
      this.getOpenAssignments();
    })
  }

  ngOnInit() {
    this.getOpenAssignments();
    this.getAccount();
  }

  getAccount() {
    this._accountService.get("me").subscribe(res => {
      this.account = res;
    })
  }

  getCompaniesOfAssignments(assignments: Assignment[]) {
    assignments.forEach(a => {
      this.getCompanyOfAssignment(a.companyId);
    });
  }

  getCompanyOfAssignment(companyId: string) {
    this._userInfoService.get(companyId).subscribe(res => {
      this.companies.push(res);
    });
  }

  getOpenAssignments() {
    if (this.search == null || this.search == "") {
      this._assignmentService.getAllOpenAssignments().subscribe(res => {
        this.assignments = res;
        this.getCompaniesOfAssignments(res);
      })
    }
    else {
      this._assignmentService.getAllOpenAssignmentsByTitle(this.search).subscribe(res => {
        this.assignments = res;
        this.getCompaniesOfAssignments(res);
      })
    }
  }

  apply(assignment: string, event) {
    console.log(event);
    this._accountService.get('me').subscribe(user => {
      this.model.assignmentId = assignment;
      this.model.accepted = false;
      this.model.applicantId = user.id;
      console.log(this.model);
      this._applicationService.addApplication(this.model).subscribe(result => {
        event.target.hidden = true;
        console.log(result);
        this._snackBar.open("Applied for the assignment!", "", {
          duration: 2000,
          panelClass: ['snackbar']
        });
      })
    })
  }
}
