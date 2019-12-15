import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SearchService } from 'src/app/services/search.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  assignments: Assignment[];
  companies: Company[] = [];
  liked: boolean = false;
  liked2: boolean = false;
  expanded: boolean = false;
  search: string;
  model: Application = new Application("", "", "", false);

  constructor(private _assignmentService: AssignmentService, private _companyService: CompanyService, 
    private _searchService: SearchService, private _applicationService: ApplicationService) {
    this._searchService.currentSearch.subscribe(result => {
      this.search = result;
      this.getOpenAssignments();
    })
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
    })
  }

  getCompanyOfAssignment(companyId: string) {
    this._companyService.getCompany(companyId).subscribe(res => {
      this.companies.push(res);
    });
  }

  ngOnInit() {
    this._assignmentService.getAllOpenAssignments().subscribe(res => {
      this.assignments = res;
      this.getAccountsAndCompaniesOfAssignments(res);
    })
  }
  getOpenAssignments(){
    if(this.search == null || this.search == ""){
      this._assignmentService.getAllOpenAssignments().subscribe(res => {
        this.assignments = res;
        this.getCompaniesOfAssignments(res);
      })
    }
    else{
      this._assignmentService.getAllOpenAssignmentsByTitle(this.search).subscribe(res => {
        this.assignments = res;
        this.getCompaniesOfAssignments(res);
      })
    }
  }

  apply(assignment: string){
    this.model.assignmentID = assignment;
    this.model.accepted = false;
    //TODO: Userid
    this.model.applicantID = "1";
    console.log(this.model);
    this._applicationService.addApplication(this.model).subscribe(result => {
      console.log(result);
    })
  }

  ngOnInit() {
    this.getOpenAssignments();
  }
}
