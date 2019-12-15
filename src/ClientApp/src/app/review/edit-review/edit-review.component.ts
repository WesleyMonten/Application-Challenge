import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

  model : Review = new Review('', '', [], '', '', '');
  commendations : Commendation[];
  reviewID: string;
  assignment: Assignment;
  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService, 
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.reviewID = Params.get('id');
    })
    this.getReview();
    this.getCommendations();
    this.getAssignment();
  }
  
  getReview(){
    this._reviewService.getReview(this.reviewID).subscribe(result => {
      console.log(result);
      this.model = result[0];
    })
  }
  
  getCommendations(){
    this._commendationService.getApplicantCommendation().subscribe(result => {
      this.commendations = result;})
  }

  getAssignment(){
    this._assignmentService.getAssignment(this.reviewID).subscribe(result => {
      this.assignment = result;
    })
  }

  onSubmit(){
    this._reviewService.changeReview(this.model).subscribe(result => {
      console.log(result);
    })
  }
}
