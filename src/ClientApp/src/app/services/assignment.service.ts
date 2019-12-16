import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { AssignmentStage } from '../models/assignment-stage.model';
import { AssignmentTopic } from '../models/assignment-topic.model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import {AppModule} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AssignmentService {

  refreshBoard = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Assignment[]>("/assignment");
  }

  getAssignment(assignmentID: string) {
    return this.http.get<Assignment>("/assignment/"+assignmentID);
  }

  getAllOpenAssignments() {
    return this.http.get<Assignment[]>("/assignment/open");
  }

  getAllOpenAssignmentsByTitle(title: string){
    return this.http.get<Assignment[]>("/assignment/open/title/"+title);
  }

  getAllAssignmentTopics() {
    return this.http.get<AssignmentTopic[]>("/assignment/topics");
  }

  create(assignment: Assignment) {
    return this.http.post<Assignment[]>("/assignment/", assignment);
  }

  getDraftAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("/assignment/company/" + companyId + "/draft");
  }

  getOpenAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("/assignment/company/" + companyId + "/open");
  }

  getClosedAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("/assignment/company/" + companyId + "/closed");
  }

  getFinishedAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("/assignment/company/" + companyId + "/finished");
  }

  delete(assignmentId: string) {
    return this.http.delete("/assignment/" + assignmentId );
  }

  publish(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Open;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  toDraft(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Draft;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  close(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Closed;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  toOpen(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Open;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  finish(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Finished;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  put(assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  cancel(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Cancelled;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }

  setApplicationOnAssignment(assignment: Assignment, applicationId: string): Observable<Assignment> {
    assignment.applicationId = applicationId;
    return this.http.put<Assignment>("/assignment/" + assignment.id, assignment);
  }
}
