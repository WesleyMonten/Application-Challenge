import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

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

  constructor(private _assignmentService: AssignmentService, private _companyService: CompanyService) { }

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

}
