import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SearchService } from 'src/app/services/search.service';

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

  constructor(private _assignmentService: AssignmentService, private _companyService: CompanyService, private _searchService: SearchService) {
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

  getCompaniesOfAssignments(assignments: Assignment[]) {
    assignments.forEach(a => {
      this.getCompanyOfAssignment(a.companyID);
    })
  }

  getCompanyOfAssignment(companyID: string) {
    this._companyService.getCompany(companyID).subscribe(res => {
      this.companies.push(res);
    });
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

  ngOnInit() {
    this.getOpenAssignments();
  }
}
