import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { AssignmentStage } from '../models/assignment-stage.model';
import { AssignmentTopic } from '../models/assignment-topic.model';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AssignmentService {

  refreshBoard = new BehaviorSubject(false);
  startDate = new Date('2019-12-12T00:00:00');
  endDate = new Date('2019-12-31T00:00:00');

  assignmentTopics: Array<AssignmentTopic> = [
    { assignmentTopicID: "2", name: "Frontend", color: "#7D5667" },
    { assignmentTopicID: "1", name: "Fullstack", color: "#21A296" }
  ]

  assignmentTopics1: Array<AssignmentTopic> = [
    { assignmentTopicID: "1", name: "Fullstack", color: "#21A296" }
  ]

  assignmentTopics2: Array<AssignmentTopic> = [
    { assignmentTopicID: "2", name: "Frontend", color: "#7D5667" }
  ]

  assignments: Array<Assignment> = [
    { assignmentID: "1", title: "Full stack application", description: "Frontend in Angular, Backend in .NET core", location: "Turnhout", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 200, stage: AssignmentStage.Open, topics: this.assignmentTopics1, companyID: "1", applicationID: null },
    { assignmentID: "2", title: "Frontend", description: "Frontend in Vue.js", location: "Mechelen", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 400, stage: AssignmentStage.Open, topics: this.assignmentTopics2, companyID: "1", applicationID: null },
  ]

  constructor() { }

  getAll() {
    return of(this.assignments);
  }

  getAssignment(assignmentID: string) {
    return of(this.assignments.find(a => a.assignmentID === assignmentID));
  }

  getAllOpenAssignments() {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Open));
  }

  getAllOpenAssignmentsByTitle(title: string){
    return of(this.assignments.filter(a => a.title == title && a.stage == AssignmentStage.Open));
  }

  getAllAssignmentTopics() {
    return of(this.assignmentTopics);
  }

  create(assignment: Assignment) {
    return of(assignment);
  }

  getDraftAssignmentsCompany(companyID: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Draft && a.companyID == companyID));
  }

  getOpenAssignmentsCompany(companyID: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Open && a.companyID == companyID));
  }

  getClosedAssignmentsCompany(companyID: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Closed && a.companyID == companyID));
  }

  getFinishedAssignmentsCompany(companyID: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Finished && a.companyID == companyID));
  }

  delete(assignmentID: string): Observable<Assignment[]> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    var index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1)
    return of(this.assignments)
  }

  publish(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Open;
    return of(assignment);
  }

  toDraft(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Draft;
    return of(assignment);
  }

  close(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Closed;
    return of(assignment);
  }

  toOpen(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Open;
    return of(assignment);
  }

  finish(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Finished;
    return of(assignment);
  }

  put(assignment: Assignment): Observable<Assignment> {
    return of(assignment);
  }

  cancel(assignmentID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.stage = AssignmentStage.Cancelled;
    return of(assignment);
  }

  setApplicationOnAssignment(assignmentID: string, applicationID: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentID === assignmentID);
    assignment.applicationID = applicationID;
    return of(assignment);
  }
}
