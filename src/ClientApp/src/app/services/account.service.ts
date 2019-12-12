import { Injectable } from '@angular/core';
import { Account } from '../models/account.model'
import { of } from 'rxjs';

@Injectable()
export class AccountService {

  dateString = '1968-11-16T00:00:00';
  date = new Date(this.dateString);

  accounts: Array<Account> = [
    { accountID: "1", nickname: "Dabbing Unicorn", password: "test123", firstName: "Nerissa", lastName: "Janssens", email: "nerissa@nerissa.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: null, company: null },
    { accountID: "2", nickname: "HollyHacker", password: "test123", firstName: "Dario", lastName: "De Backer", email: "dario@dario.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: true, applicant: null, company: null },
    { accountID: "3", nickname: "Culacant", password: "test123", firstName: "Jonas", lastName: "Dayaert", email: "jonas@jonas.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: null, company: null },
    { accountID: "4", nickname: "SirTurtle", password: "test123", firstName: "Wesley", lastName: "Monten", email: "wesley@wesley.be", dateOfBirth: this.date, linkedInUrl: "www.linkedIn.com", isAdmin: false, applicant: null, company: null },
  ];

  constructor() { }

  get() {
    return of(this.accounts);
  }
}
