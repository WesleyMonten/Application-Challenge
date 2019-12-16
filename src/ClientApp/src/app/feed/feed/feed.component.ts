import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { SearchService } from 'src/app/services/search.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import {UserInfoService} from "../../services/user-info.service";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  assignments: Assignment[];
  companies: UserInfo[] = [];
  liked: boolean = false;
  liked2: boolean = false;
  expanded: boolean = false;
  search: string;
  model: Application = new Application("", "", "", false);

  constructor(private _assignmentService: AssignmentService,
    private _searchService: SearchService, private _applicationService: ApplicationService, private _userInfoService: UserInfoService) {
    this._searchService.currentSearch.subscribe(result => {
      this.search = result;
      this.getOpenAssignments();
    })
  }

  ngOnInit() {
    this.getOpenAssignments();
  }


  toggleLike() {
    this.liked = this.liked != true;
  }

  toggleLike2() {
    this.liked2 = this.liked2 != true;
  }

  toggleExpand() {
    this.expanded = this.expanded != true
  }

  getAccountsAndCompaniesOfAssignments(assignments: Assignment[]) {
    assignments.forEach(a => {
      this.getCompanyOfAssignment(a.companyId);
    });
  }

  getCompanyOfAssignment(companyId: string) {
    this._userInfoService.get(companyId).subscribe(res => {
      this.companies.push(res);
    });
  }
  getOpenAssignments(){
    if(this.search == null || this.search == ""){
      this._assignmentService.getAllOpenAssignments().subscribe(res => {
        this.assignments = res;
        this.getAccountsAndCompaniesOfAssignments(res);
      })
    }
    else{
      this._assignmentService.getAllOpenAssignmentsByTitle(this.search).subscribe(res => {
        this.assignments = res;
        this.getAccountsAndCompaniesOfAssignments(res);
      })
    }
  }

  apply(assignment: string){
    this.model.assignmentId = assignment;
    this.model.accepted = false;
    //TODO: Userid
    this.model.applicantId = "1";
    console.log(this.model);
    this._applicationService.addApplication(this.model).subscribe(result => {
      console.log(result);
    })
  }
}
