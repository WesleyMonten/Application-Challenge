import { Applicant } from "./applicant.model";
import { Company } from "./company.model";

export class Account {
    constructor(public accountId: string, public nickname: string, public email: string, public password: string, public firstName: string, public lastName: string, public dateOfBirth: Date, public linkedInUrl: string, public isAdmin: boolean, public applicant: Applicant, public company: Company) { }
}
