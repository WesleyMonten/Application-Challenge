import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Skill } from 'src/app/models/skill.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { FormBuilder, Validators, Form, FormGroup, FormControl } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { Location, DatePipe } from '@angular/common';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  skillsAccount: Skill[];
  skills: Skill[];
  account: Account;
  editApplicantForm: FormGroup;
  editCompanyForm: FormGroup;

  constructor(private _accountService: AccountService, private _skillService: SkillService, private route: ActivatedRoute, private fb: FormBuilder, private _location: Location, private _companyService: CompanyService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.getAccount(params['id']); });
    this._skillService.get().subscribe(res => { this.skills = res; });
  }

  getAccount(accountId: string) {
    this._accountService.get(accountId).subscribe(res => {
      this.account = res;
      this.skillsAccount = res.applicant ? res.applicant.skills : null;

      if (this.account.applicant) {
        this.editApplicantForm = this.fb.group({
          Nickname: [this.account.nickname],
          FirstName: [this.account.firstName],
          LastName: [this.account.lastName],
          Email: [this.account.email],
          DateOfBirth: [this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy')],
          LinkedIn: [this.account.linkedInUrl],
          Password: [''],
          ConfirmPassword: [''],
          Biography: [this.account.applicant ? this.account.applicant.biography : null],
        });
      }

      if (this.account.company) {
        this.editCompanyForm = this.fb.group({
          Nickname: [this.account.nickname],
          FirstName: [this.account.firstName],
          LastName: [this.account.lastName],
          Email: [this.account.email],
          DateOfBirth: [this.datepipe.transform(this.account.dateOfBirth, 'MM/dd/yyyy')],
          LinkedIn: [this.account.linkedInUrl],
          Password: [''],
          ConfirmPassword: [''],
          Name: [this.account.company.name],
          PhoneNumber: [this.account.company.contactPhoneNumber],
          CompanyEmail: [this.account.company.contactEmail],
          Biography: [this.account.company.biography]
        });
      }
    });
  }

  addSkill(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      var skill = this.skills.find(s => s.name.toLowerCase() == value.toLowerCase());
      if (skill != null) {
        this.skillsAccount.push({ skillId: skill.skillId, name: skill.name, color: skill.color });
      } else {
        this.skillsAccount.push({ skillId: "", name: value.trim(), color: '#007ACC' });
      }
    }
    if (input) {
      input.value = '';
    }
  }

  removeSkill(skill: Skill): void {
    const index = this.skillsAccount.indexOf(skill);

    if (index >= 0) {
      this.skillsAccount.splice(index, 1);
    }
  }

  onSubmitEditAccount() {
    this.editApplicantForm.addControl('Skills', new FormControl(this.skillsAccount));
    this._accountService.put(this.editApplicantForm.value).subscribe(res => {
      this._accountService.refreshProfile.next(true);
      this._accountService.refreshNav.next(true);
      this.goBack();
      console.log(res);
    })
  }

  onSubmitEditCompany() {
    this._companyService.put(this.editCompanyForm.value).subscribe(res => {
      this._accountService.refreshProfile.next(true);
      this._accountService.refreshNav.next(true);
      this.goBack();
      console.log(res);
    })
  }

  goBack() {
    this._location.back();
  }

}
