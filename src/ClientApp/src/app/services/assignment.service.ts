import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { AssignmentStage } from '../models/assignment-stage.model';
import { AssignmentTopic } from '../models/assignment-topic.model';
import { of } from 'rxjs';
import {AppModule} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AssignmentService {

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

}
