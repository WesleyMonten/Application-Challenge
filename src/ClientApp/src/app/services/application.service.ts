import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import {Observable, of} from 'rxjs';
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApplicationService {

  constructor(private http: HttpClient) {}
// voorbeeld implementatie:
/*
  this._service.getApplications().subscribe( result=>{
  console.log(result);
})
*/
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(AppComponent.API_URL+"/application");
  }

  getApplication(id: string){
    return this.http.get<Application>(AppComponent.API_URL+"/application/" + id);
  }
}
