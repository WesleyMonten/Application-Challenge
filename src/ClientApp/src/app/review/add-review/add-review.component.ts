import { Component, OnInit } from '@angular/core';
import { Commendation } from 'src/app/models/commendation.model';
import { CommendationService } from 'src/app/services/commendation.service';
import { Review } from 'src/app/models/review.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
 
  model : Review = new Review('', '', [], '', '', '');
  commendations : Commendation[];
  assignmentID: string;
  assignment: Assignment;
  constructor(private _commendationService: CommendationService, private _assignmentService: AssignmentService, 
    private _applicationService: ApplicationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(Params => {
      this.assignmentID = Params.get('id');
    })
    this.getCommendations();
    this.getAssignment();
  }

  getCommendations(){
    this._commendationService.getApplicantCommendation().subscribe(result => {
      this.commendations = result;})
  }

  getAssignment(){
    this._assignmentService.getAssignment(this.assignmentID).subscribe(result => {
      this.assignment = result;
    })
  }

  onSubmit(){
    this.model.companyID = this.assignment.companyID;
    this.model.assignmentID = this.assignmentID;
    this._applicationService.getApplication(this.assignment.applicationID).subscribe(result => {
      console.log(result);
    })
    console.log(this.model);
  }
}
