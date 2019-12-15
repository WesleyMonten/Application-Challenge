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
  startDate = new Date('2019-12-12T00:00:00');
  endDate = new Date('2019-12-31T00:00:00');

  assignmentTopics: Array<AssignmentTopic> = [
    { assignmentTopicId: "2", name: "Frontend", color: "#7D5667" },
    { assignmentTopicId: "1", name: "Fullstack", color: "#21A296" }
  ]

  assignmentTopics1: Array<AssignmentTopic> = [
    { assignmentTopicId: "1", name: "Fullstack", color: "#21A296" }
  ]

  assignmentTopics2: Array<AssignmentTopic> = [
    { assignmentTopicId: "2", name: "Frontend", color: "#7D5667" }
  ]

  assignments: Array<Assignment> = [
    { assignmentId: "1", title: "Full stack application", description: "Frontend in Angular, Backend in .NET core", location: "Turnhout", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 200, stage: AssignmentStage.Open, topics: this.assignmentTopics1, companyId: "1", applicationId: null },
    { assignmentId: "2", title: "Frontend", description: "Frontend in Vue.js", location: "Mechelen", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 400, stage: AssignmentStage.Draft, topics: this.assignmentTopics2, companyId: "1", applicationId: null },
  ]

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
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  toDraft(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Draft;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  close(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Closed;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  toOpen(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Open;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  finish(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Finished;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  put(assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  cancel(assignment: Assignment): Observable<Assignment> {
    assignment.stage = AssignmentStage.Cancelled;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }

  setApplicationOnAssignment(assignment: Assignment, applicationId: string): Observable<Assignment> {
    assignment.applicationId = applicationId;
    return this.http.put<Assignment>("/assignment/" + assignment.assignmentId, assignment);
  }
}
