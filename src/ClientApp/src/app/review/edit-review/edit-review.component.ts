import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

  reviewID: string;
  model : Review = new Review('', '', [], '', '', '');
  commendations : Commendation[];
  constructor(private route : ActivatedRoute, private _reviewService: ReviewService, private _commendationService: CommendationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.reviewID = Params.get('id');
    })
    this.getReview();
  }

  getCommendations(){
    this._commendationService.getApplicantCommendation().subscribe(result => {
      this.commendations = result;})
  }

  getReview(){
    this._reviewService.getReviewsApplicant(this.reviewID).subscribe(result => {
     console.log(result);
    })
  }
}
