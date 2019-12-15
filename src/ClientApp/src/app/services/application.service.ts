import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AppComponent } from "../app.component";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApplicationService {

  isClosed = new BehaviorSubject(false);

  applications: Array<Application> = [
    { applicationId: "1", assignmentId: "1", applicantId: "1", Accepted: false },
    { applicationId: "2", assignmentId: "1", applicantId: "2", Accepted: false },
  ]

  constructor(private http: HttpClient) { }
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>("/application");
  }

  getApplicationsAssignment(assignmentId: string): Observable<Application[]> {
    return this.http.get<Application[]>("/application/assignment/" + assignmentId);
  }

  choose(application: Application): Observable<Application> {
    application.Accepted = true;
    return this.http.put<Application>("/application/" + application.applicationId, application);
  }

  getApplication(id: string){
    return this.http.get<Application>(AppComponent.API_URL+"/application/" + id);
  }

  addApplication(application: Application){
    application.applicantID = (this.applications.length + 1).toString();
    return of(this.applications.push(application));
  }


  getApplicationsOfAccount(accountId: string): Observable<Application[]> {
    return of(this.applications.filter(a => a.applicantId == accountId));
  }
}
