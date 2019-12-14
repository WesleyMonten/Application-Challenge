import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { of } from 'rxjs';

@Injectable()
export class CompanyService {

  companies: Array<Company> = [
    { companyId: "1", name: "Microsoft", contactEmail: "microsoft@microsoft.com", contactPhoneNumber: "4659975532", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." },
    { companyId: "2", name: "Apple", contactEmail: "applet@apple.com", contactPhoneNumber: "4826568484", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." }
  ]

  constructor() { }

  getAll() {
    return of(this.companies);
  }

  getCompany(companyId: string) {
    return of(this.companies.find(c => c.companyId === companyId));
  }
}
