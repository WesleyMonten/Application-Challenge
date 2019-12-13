import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { AssignmentStage } from '../models/assignment-stage.model';
import { AssignmentTopic } from '../models/assignment-topic.model';
import { of } from 'rxjs';

@Injectable()
export class AssignmentService {

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
    { assignmentID: "1", title: "Full stack application", description: "Frontend in Angular, Backend in .NET core", location: "Turnhout", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 200, stage: AssignmentStage.Open, topics: this.assignmentTopics1, companyID: "1", applicationID: "1" },
    { assignmentID: "2", title: "Frontend", description: "Frontend in Vue.js", location: "Mechelen", startTime: this.startDate, endTime: this.endDate, isInternship: false, compensation: 400, stage: AssignmentStage.Open, topics: this.assignmentTopics2, companyID: "1", applicationID: "2" },
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

  getAllAssignmentTopics() {
    return of(this.assignmentTopics);
  }

  create(assignment: Assignment) {
    return of(assignment);
  }
}
