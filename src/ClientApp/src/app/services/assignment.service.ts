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

  constructor() { }

  getAll() {
    return of(this.assignments);
  }

  getAssignment(assignmentId: string) {
    return of(this.assignments.find(a => a.assignmentId === assignmentId));
  }

  getAllOpenAssignments() {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Open));
  }

  getAllAssignmentTopics() {
    return of(this.assignmentTopics);
  }

  create(assignment: Assignment) {
    return of(assignment);
  }

  getDraftAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Draft && a.companyId == companyId));
  }

  getOpenAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Open && a.companyId == companyId));
  }

  getClosedAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Closed && a.companyId == companyId));
  }

  getFinishedAssignmentsCompany(companyId: string): Observable<Assignment[]> {
    return of(this.assignments.filter(a => a.stage == AssignmentStage.Finished && a.companyId == companyId));
  }

  delete(assignmentId: string): Observable<Assignment[]> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    var index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);
    return of(this.assignments);
  }

  publish(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Open;
    return of(assignment);
  }

  toDraft(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Draft;
    return of(assignment);
  }

  close(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Closed;
    return of(assignment);
  }

  toOpen(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Open;
    return of(assignment);
  }

  finish(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Finished;
    return of(assignment);
  }

  put(assignment: Assignment): Observable<Assignment> {
    return of(assignment);
  }

  cancel(assignmentId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.stage = AssignmentStage.Cancelled;
    return of(assignment);
  }

  setApplicationOnAssignment(assignmentId: string, applicationId: string): Observable<Assignment> {
    var assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    assignment.applicationId = applicationId;
    return of(assignment);
  }
}
