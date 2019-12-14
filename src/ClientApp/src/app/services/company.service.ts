import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { of, Observable } from 'rxjs';

@Injectable()
export class CompanyService {

  companies: Array<Company> = [
    { companyID: "1", name: "Microsoft", contactEmail: "microsoft@microsoft.com", contactPhoneNumber: "4659975532", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." },
    { companyID: "2", name: "Apple", contactEmail: "applet@apple.com", contactPhoneNumber: "4826568484", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." }
  ]

  constructor() { }

  getAll() {
    return of(this.companies);
  }

  getCompany(companyID: string) {
    return of(this.companies.find(c => c.companyID === companyID));
  }

  put(company: Company): Observable<Company> {
    return of(company);
  }

  delete(companyID: string): Observable<Company[]> {
    var company = this.companies.find(c => c.companyID === companyID);
    var index = this.companies.indexOf(company);
    return of(this.companies.splice(index, 1));
  }
}
