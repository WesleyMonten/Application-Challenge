import { Injectable } from '@angular/core';
import { Commendation } from '../models/commendation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommendationService {

  constructor(private http: HttpClient) { }

  getApplicantCommendation(){
   return this.http.get<Commendation[]>("https://localhost:5001/commendation/applicant");
  }

}
