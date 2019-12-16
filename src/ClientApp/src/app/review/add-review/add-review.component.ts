import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import {MatSelectionList} from "@angular/material/list";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  model: Review = new Review('', '', [], '', '', '');
  applicantCommendations: Commendation[];
  companyCommendations: Commendation[];
  assignmentId: string;
  applicantId: string;
  isCompanyReview: boolean;
  assignment: Assignment;

  @ViewChild("applicantCommendationsList", {static: false}) applicantCommendationsList: MatSelectionList;
  @ViewChild("companyCommendationsList", {static: false}) companyCommendationsList: MatSelectionList;

  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService,
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute, private _accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.assignmentId = Params.get('id');
      this._accountService.get('me').subscribe(me => this.isCompanyReview = !me.company);
    });

    this._commendationService.getApplicantCommendation().subscribe(result => { this.applicantCommendations = result; });
    this._commendationService.getCompanyCommendation().subscribe(result => { this.companyCommendations = result; });
    this._assignmentService.getAssignment(this.assignmentId).subscribe(result => {
      this.assignment = result;
      this._applicationService.getApplication(this.assignment.applicationId).subscribe(a => this.applicantId = a.applicantId);
    })

  }

  isChecked(commendation: Commendation): boolean {
    return this.model.commendations.filter(c => c == commendation.imageName).length > 0;
  }

  onSubmit(isCompany: boolean){
    const allCommendations = isCompany ? this.companyCommendations : this.applicantCommendations;
    const list = isCompany ? this.companyCommendationsList : this.applicantCommendationsList;

    const imageNames = list.selectedOptions.selected.map(option => <string>option.value);
    this.model.commendations = allCommendations.filter(c => imageNames.includes(c.imageName)).map(c => c.imageName);
    this.model.companyId = this.assignment.companyId;
    this.model.assignmentId = this.assignmentId;
    this.model.applicantId = this.applicantId;

    (this.isCompanyReview ? this._reviewService.addCompanyReview(this.model) : this._reviewService.addApplicantReview(this.model)).subscribe(result => {
      console.log(result);
      this.router.navigate(["/"]);
    })
  }
}
