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
  }

  ngOnInit() {
    this._assignmentService.refreshBoard.subscribe(() => {
      const id = 'me';
      this.getDraftAssignments(id);
      this.getOpenAssignments(id);
      this.getClosedAssignments(id);
      this.getFinishedAssignments(id);
    })
  }

  seeListOfApplicants(assignmentId: string, isClosed: boolean) {
    this._assignmentService.getAssignment(assignmentId).subscribe(res => {
      if (res.applicationId == null) {
        this._applicationService.isClosed.next(isClosed);
        this.router.navigate(["/applications", assignmentId]);
      }
    })
  }

  sendReview(id: string) {
    this.router.navigate(["/review", id]);
  }

  delete(assignmentId: string) {
    this._assignmentService.delete(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    });
  }

  publish(assignment: Assignment) {
    this._assignmentService.publish(assignment).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toDraft(assignment: Assignment) {
    this._assignmentService.toDraft(assignment).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  close(assignment: Assignment) {
    this._assignmentService.close(assignment).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toOpen(assignment: Assignment) {
    this._assignmentService.toOpen(assignment).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  finish(assignment: Assignment) {
    this._assignmentService.finish(assignment).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  getIdFromParameter() {
  }

  getDraftAssignments(companyId: string) {
    this._assignmentService.getDraftAssignmentsCompany(companyId).subscribe(res => {
      this.draftAssignments = res;
    });
  }

  getOpenAssignments(companyId: string) {
    this._assignmentService.getOpenAssignmentsCompany(companyId).subscribe(res => {
      this.openAssignments = res;
    });
  }

  getClosedAssignments(companyId: string) {
    this._assignmentService.getClosedAssignmentsCompany(companyId).subscribe(res => {
      this.closedAssignments = res;
      console.log(res);
    });
  }

  getFinishedAssignments(companyId: string) {
    this._assignmentService.getFinishedAssignmentsCompany(companyId).subscribe(res => {
      this.finishedAssignments = res;
    });
  }
}
