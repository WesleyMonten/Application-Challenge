import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

  model: Review = new Review('', '', [], '', '', '');
  applicantCommendations: Commendation[];
  companyCommendations: Commendation[];
  reviewId: string;
  isCompanyReview: boolean;
  assignment: Assignment;

  @ViewChild("applicantCommendationsList", {static: false}) applicantCommendationsList: MatSelectionList;
  @ViewChild("companyCommendationsList", {static: false}) companyCommendationsList: MatSelectionList;

  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService,
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.reviewId = Params.get('id');
    });
    this._reviewService.getReview(this.reviewId).subscribe(result => {
      this.model = result;
      this.isCompanyReview = result.isCompanyReview;
    });
    this._commendationService.getApplicantCommendation().subscribe(result => { this.applicantCommendations = result; })
    this._commendationService.getCompanyCommendation().subscribe(result => { this.companyCommendations = result; })
    this._assignmentService.getAssignment(this.reviewId).subscribe(result => { this.assignment = result; })
  }

  isChecked(commendation: Commendation): boolean {
    return this.model.commendations.filter(c => c.displayName == commendation.displayName).length > 0;
  }

  onSubmit(isCompany: boolean) {
    const allCommendations = isCompany ? this.companyCommendations : this.applicantCommendations;
    const list = isCompany ? this.companyCommendationsList : this.applicantCommendationsList;

    const imageNames = list.selectedOptions.selected.map(option => <string>option.value);
    this.model.commendations = allCommendations.filter(c => imageNames.includes(c.imageName));

    this._reviewService.changeReview(this.model).subscribe(result => {
      console.log(result);
    })
  }
}
