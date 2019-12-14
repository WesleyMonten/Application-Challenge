import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AppComponent } from "../app.component";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApplicationService {

  isClosed = new BehaviorSubject(false);

  applications: Array<Application> = [
    { applicationID: "1", assignmentID: "1", applicantID: "1", accepted: false },
    { applicationID: "2", assignmentID: "1", applicantID: "2", accepted: false },
  ]

  constructor(private http: HttpClient) { }
  // voorbeeld implementatie:
  /*
    this._service.getApplications().subscribe( result=>{
    console.log(result);
  })
  */
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(AppComponent.API_URL + "/application");
  }

  getApplicationsAssignment(assignmentID: string): Observable<Application[]> {
    return of(this.applications.filter(a => a.assignmentID === assignmentID));
  }

  choose(applicationID: string): Observable<Application> {
    var application = this.applications.find(a => a.applicationID === applicationID);
    application.accepted = true;
    return of(application);
  }
}
