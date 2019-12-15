import { Component, OnInit } from '@angular/core';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';
import { Review } from 'src/app/models/review.model';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ApplicationService } from 'src/app/services/application.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  model : Review = new Review('', '', [], '', '', '');
  commendations : Commendation[];
  assignmentId: string;
  assignment: Assignment;
  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService,
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.assignmentId = Params.get('id');
    });
    this.getCommendations();
    this.getAssignment();
  }

  getCommendations(){
    this._commendationService.getApplicantCommendation().subscribe(result => {
      this.commendations = result;})
  }

  getAssignment(){
    this._assignmentService.getAssignment(this.assignmentId).subscribe(result => {
      this.assignment = result;
    })
  }

  onSubmit(){
    this.model.companyId = this.assignment.companyId;
    this.model.assignmentId = this.assignmentId;
    // this._applicationService.getApplication(this.assignment.applicationID).subscribe(result => {
    //   console.log(result);
    //   this.model.applicantID = result.applicantID;
    // })
    console.log(this.model);
    this._reviewService.addApplicantReview(this.model).subscribe(result => {
      console.log(result);
    })
  }
}
