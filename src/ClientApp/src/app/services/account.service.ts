import {Injectable} from '@angular/core';
import {Account} from '../models/account.model'
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Applicant} from '../models/applicant.model';
import {Skill} from '../models/skill.model';
import {Company} from '../models/company.model';

@Injectable()
export class AccountService {

  isLoggedIn = new BehaviorSubject(false);
  dateString = '1968-11-16T00:00:00';
  date = new Date(this.dateString);

  skills1: Array<Skill> = [
    { skillID: "1", name: ".NET", color: "#5C2D91" },
    { skillID: "2", name: "Angular", color: "#C3002F" },
    { skillID: "3", name: "Freelance", color: "#1DBF73" },
  ]

  skills2: Array<Skill> = [
    { skillID: "4", name: "Java", color: "#E44D26" },
    { skillID: "5", name: "Internship", color: "#CF3C6E" },
  ]

  applicant1: Applicant = { applicantID: "2", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 };
  applicant2: Applicant = { applicantID: "1", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 };
  applicant3: Applicant = { applicantID: "3", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 };
  applicant4: Applicant = { applicantID: "4", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 };

  company1: Company = { companyID: "1", name: "Microsoft", contactEmail: "microsoft@microsoft.com", contactPhoneNumber: "4659975532", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." };
  company2: Company = { companyID: "2", name: "Apple", contactEmail: "applet@apple.com", contactPhoneNumber: "4826568484", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi." };


  accounts: Array<Account> = [
    { accountID: "1", nickname: "Dabbing Unicorn", password: "test123", firstName: "Nerissa", lastName: "Janssens", email: "nerissa@nerissa.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: this.applicant1, company: null },
    { accountID: "2", nickname: "HollyHacker", password: "test123", firstName: "Dario", lastName: "De Backer", email: "dario@dario.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: this.applicant2, company: this.company1 },
    { accountID: "3", nickname: "Culacant", password: "test123", firstName: "Jonas", lastName: "Dayaert", email: "jonas@jonas.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: this.applicant3, company: this.company2 },
    { accountID: "4", nickname: "SirTurtle", password: "test123", firstName: "Wesley", lastName: "Monten", email: "wesley@wesley.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: this.applicant4, company: null },
  ];

  constructor() { }

  getAll() {
    return of(this.accounts);
  }

  get(accountID: string): Observable<Account> {
    var x=  of(this.accounts.find(a => a.accountID === accountID))
    return x;
  }

  delete(accountID: string): Observable<Account[]> {
    var account = this.accounts.find(a => a.accountID === accountID);
    var index = this.accounts.indexOf(account);
    return of(this.accounts.splice(index, 1));
  }

  put(account: Account): Observable<Account> {
    return of(account)
  }
}
