import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { of } from 'rxjs';

@Injectable()
export class ApplicationService {

  applications: Array<Application> = [
    { applicationID: "1", assignmentID: "1", applicantID: "1" },
    { applicationID: "2", assignmentID: "1", applicantID: "2" },
  ]

  constructor() { }

  get() {
    return of(this.applications);
  }
}
