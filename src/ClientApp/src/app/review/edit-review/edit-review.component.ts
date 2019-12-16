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
import * as assert from "assert";

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
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute, private _accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.reviewId = Params.get('id');
      this._accountService.get('me').subscribe(me => {
        this.isCompanyReview = !me.company;
        (this.isCompanyReview ? this._reviewService.getCompanyReview(this.reviewId) : this._reviewService.getApplicantReview(this.reviewId)).subscribe(result => {
          this.model = result;
          assert(this.isCompanyReview == result.isCompanyReview);
          this.isCompanyReview = result.isCompanyReview;
        });

      });
    });
    this._commendationService.getApplicantCommendation().subscribe(result => { this.applicantCommendations = result; });
    this._commendationService.getCompanyCommendation().subscribe(result => { this.companyCommendations = result; });
    this._assignmentService.getAssignment(this.reviewId).subscribe(result => { this.assignment = result; });
  }

  isChecked(commendation: Commendation): boolean {
    return this.model.commendations.filter(c => c == commendation.imageName).length > 0;
  }

  onSubmit(isCompany: boolean) {
    const allCommendations = isCompany ? this.companyCommendations : this.applicantCommendations;
    const list = isCompany ? this.companyCommendationsList : this.applicantCommendationsList;

    const imageNames = list.selectedOptions.selected.map(option => <string>option.value);
    this.model.commendations = allCommendations.filter(c => imageNames.includes(c.imageName)).map(c => c.imageName);

    (this.isCompanyReview ? this._reviewService.putCompanyReview(this.reviewId, this.model) : this._reviewService.putApplicantReview(this.reviewId, this.model)).subscribe(result => {
      console.log(result);
      this.router.navigate(["/"]);
    })
  }
}
