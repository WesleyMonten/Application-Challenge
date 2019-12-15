import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AppComponent } from "../app.component";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApplicationService {

  isClosed = new BehaviorSubject(false);

  applications: Array<Application> = [
    { applicationId: "1", assignmentId: "1", applicantId: "1", accepted: false },
    { applicationId: "2", assignmentId: "1", applicantId: "2", accepted: false },
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

  getApplicationsAssignment(assignmentId: string): Observable<Application[]> {
    return of(this.applications.filter(a => a.assignmentId === assignmentId));
  }

  choose(applicationId: string): Observable<Application> {
    var application = this.applications.find(a => a.applicationId === applicationId);
    application.accepted = true;
    return of(application);
  }

  getApplicationsOfAccount(accountId: string): Observable<Application[]> {
    return of(this.applications.filter(a => a.applicantId == accountId));
  }
}
