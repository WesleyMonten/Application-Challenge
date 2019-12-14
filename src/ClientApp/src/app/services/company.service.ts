import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { of } from 'rxjs';
import {Assignment} from "../models/assignment.model";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CompanyService {

  companies: Array<Company> = [
    { companyId: "1", name: "Microsoft", contactEmail: "microsoft@microsoft.com", contactPhoneNumber: "4659975532", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." },
    { companyId: "2", name: "Apple", contactEmail: "applet@apple.com", contactPhoneNumber: "4826568484", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." }
  ]

  constructor(private http: HttpClient) { }

  getAll() {
    return of(this.companies);
  }

  getCompany(companyID: string) {
    // TODO: fix als company controller af is
    return of(this.companies.find(c => c.companyId === "1"));
//    return this.http.get<Company>(AppComponent.API_URL+"/company/"+companyID);
  }
}

