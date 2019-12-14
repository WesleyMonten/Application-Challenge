import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-assignment-board',
  templateUrl: './assignment-board.component.html',
  styleUrls: ['./assignment-board.component.scss']
})
export class AssignmentBoardComponent implements OnInit {

  draftAssignments: Assignment[];
  openAssignments: Assignment[];
  closedAssignments: Assignment[];
  finishedAssignments: Assignment[];

  constructor(private _assignmentService: AssignmentService, private route: ActivatedRoute, private router: Router, private _applicationService: ApplicationService) {
    this._assignmentService.refreshBoard.subscribe(() => {
      this.ngOnInit();
    })
  }

  seeListOfApplicants(assignmentID: string, isClosed: boolean) {
    this._applicationService.isClosed.next(isClosed);
    this.router.navigate(["/applications", assignmentID])
  }

  delete(assignmentID: string) {
    this._assignmentService.delete(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    });
  }

  publish(assignmentID: string) {
    this._assignmentService.publish(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toDraft(assignmentID: string) {
    this._assignmentService.toDraft(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  close(assignmentID: string) {
    this._assignmentService.close(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toOpen(assignmentID: string) {
    this._assignmentService.toOpen(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  finish(assignmentID: string) {
    this._assignmentService.finish(assignmentID).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getDraftAssignments(id.toString());
      this.getOpenAssignments(id.toString());
      this.getClosedAssignments(id.toString());
      this.getFinishedAssignments(id.toString());
    })
  }

  getDraftAssignments(companyID: string) {
    this._assignmentService.getDraftAssignmentsCompany(companyID).subscribe(res => {
      this.draftAssignments = res;
    });
  }

  getOpenAssignments(companyID: string) {
    this._assignmentService.getOpenAssignmentsCompany(companyID).subscribe(res => {
      this.openAssignments = res;
    });
  }

  getClosedAssignments(companyID: string) {
    this._assignmentService.getClosedAssignmentsCompany(companyID).subscribe(res => {
      this.closedAssignments = res;
      console.log(res);
    });
  }

  getFinishedAssignments(companyID: string) {
    this._assignmentService.getFinishedAssignmentsCompany(companyID).subscribe(res => {
      this.finishedAssignments = res;
    });
  }

  ngOnInit() {
    this.getIdFromParameter();
  }

}
