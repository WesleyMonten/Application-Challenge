import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AppComponent } from "../app.component";
import { HttpClient } from "@angular/common/http";
import {Assignment} from "../models/assignment.model";

@Injectable()
export class ApplicationService {

  isClosed = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>("/application");
  }

  getApplicationsAssignment(assignmentId: string): Observable<Application[]> {
    return this.http.get<Application[]>("/application/assignment/" + assignmentId);
  }

  choose(application: Application): Observable<Application> {
    application.accepted = true;
    return this.http.put<Application>("/application/" + application.id, application);
  }

  getApplication(id: string){
    return this.http.get<Application>("/application/" + id);
  }

  addApplication(application: Application){
    return this.http.post<Application[]>("/application/", application);
  }


  getApplicationsOfAccount(accountId: string): Observable<Application[]> {
    return this.http.get<Application[]>("/application/applicant/" + accountId);
  }
}
