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

  seeListOfApplicants(assignmentId: string, isClosed: boolean) {
    this._applicationService.isClosed.next(isClosed);
    this.router.navigate(["/applications", assignmentId])
  }

  delete(assignmentId: string) {
    this._assignmentService.delete(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    });
  }

  publish(assignmentId: string) {
    this._assignmentService.publish(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toDraft(assignmentId: string) {
    this._assignmentService.toDraft(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  close(assignmentId: string) {
    this._assignmentService.close(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  toOpen(assignmentId: string) {
    this._assignmentService.toOpen(assignmentId).subscribe(() => {
      this._assignmentService.refreshBoard.next(true);
    })
  }

  finish(assignmentId: string) {
    this._assignmentService.finish(assignmentId).subscribe(() => {
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

  ngOnInit() {
    this.getIdFromParameter();
  }

}
