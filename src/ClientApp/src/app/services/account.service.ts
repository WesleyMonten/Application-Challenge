import { Injectable } from '@angular/core';
import { Account } from '../models/account.model'
import { of, BehaviorSubject, Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Skill } from '../models/skill.model';
import { Company } from '../models/company.model';
import { MatSidenav } from '@angular/material';

@Injectable()
export class AccountService {

  isLoggedIn = new BehaviorSubject(false);
  refreshProfile = new BehaviorSubject(false);
  dateString = '1968-11-16T00:00:00';
  date = new Date(this.dateString);

  skills1: Array<Skill> = [
    { skillId: "1", name: ".NET", color: "#5C2D91" },
    { skillId: "2", name: "Angular", color: "#C3002F" },
    { skillId: "3", name: "Freelance", color: "#1DBF73" },
  ]

  skills2: Array<Skill> = [
    { skillId: "4", name: "Java", color: "#E44D26" },
    { skillId: "5", name: "Internship", color: "#CF3C6E" },
  ]

  applicant1: Applicant = { applicantId: "2", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 };
  applicant2: Applicant = { applicantId: "1", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 };
  applicant3: Applicant = { applicantId: "3", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 };
  applicant4: Applicant = { applicantId: "4", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 };

  company1: Company = { companyId: "1", name: "Microsoft", contactEmail: "microsoft@microsoft.com", contactPhoneNumber: "4659975532", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." };
  company2: Company = { companyId: "2", name: "Apple", contactEmail: "applet@apple.com", contactPhoneNumber: "4826568484", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." };


  accounts: Array<Account> = [
    { accountId: "1", nickname: "Dabbing Unicorn", password: "test123", firstName: "Nerissa", lastName: "Janssens", email: "nerissa@nerissa.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: this.applicant1, company: null },
    { accountId: "2", nickname: "HollyHacker", password: "test123", firstName: "Dario", lastName: "De Backer", email: "dario@dario.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: this.applicant2, company: this.company1 },
    { accountId: "3", nickname: "Culacant", password: "test123", firstName: "Jonas", lastName: "Dayaert", email: "jonas@jonas.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: this.applicant3, company: this.company2 },
    { accountId: "4", nickname: "SirTurtle", password: "test123", firstName: "Wesley", lastName: "Monten", email: "wesley@wesley.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: this.applicant4, company: null },
  ];

  constructor() { }

  getAll() {
    return of(this.accounts);
  }

  get(accountId: string) {
    return of(this.accounts.find(a => a.accountId === accountId))
  }

  delete(accountId: string) {
    var account = this.accounts.find(a => a.accountId === accountId);
    var index = this.accounts.indexOf(account);
    return of(this.accounts.splice(index, 1));
  }

  put(account: Account) {
    return of(account)
  }

  putStatus(account): Observable<Account> {
    return of(account);
  }
}