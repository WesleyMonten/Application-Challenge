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

  model: Review = new Review('', '', [], '', '', '');
  applicantCommendations: Commendation[];
  reviewId: string;
  assignment: Assignment;
  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService,
    private _applicationService: ApplicationService, private _reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.reviewId = Params.get('id');
    });
    this.getReview();
    this.getCommendations();
    this.getAssignment();
  }

  isChecked(commendation: Commendation) {
    if (this.model.commendations.filter(c => c.displayName == commendation.displayName).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getReview() {
    this._reviewService.getReview(this.reviewId).subscribe(result => {
      console.log(result);
      this.model = result;
    })
  }

  getCommendations() {
    this._commendationService.getApplicantCommendation().subscribe(result => {
      this.applicantCommendations = result;
    })
  }

  getAssignment() {
    this._assignmentService.getAssignment(this.reviewId).subscribe(result => {
      this.assignment = result;
    })
  }

  onSubmit() {
    this._reviewService.changeReview(this.model).subscribe(result => {
      console.log(result);
    })
  }

  shouldBeChecked(c: Commendation) {
    return true;
  }

  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}
