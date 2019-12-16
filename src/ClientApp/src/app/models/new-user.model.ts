import { Applicant } from "./applicant.model";
import { Company } from "./company.model";

export class NewUser {
    constructor(public username: string, public password: string, public email: string, public dateOfBirth: Date, 
        public applicant: Applicant, public company: Company ){}
}
