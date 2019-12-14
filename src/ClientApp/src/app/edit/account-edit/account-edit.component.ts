import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Skill } from 'src/app/models/skill.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { FormBuilder, Validators, Form, FormGroup, FormControl } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { Location } from '@angular/common';

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
  editAccountForm: FormGroup;

  constructor(private _accountService: AccountService, private _skillService: SkillService, private route: ActivatedRoute, private fb: FormBuilder, private _location: Location) { }

  goBack() {
    this._location.back();
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

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getAccount(id.toString());
    })
  }

  getAccount(accountId: string) {
    this._accountService.get(accountId).subscribe(res => {
      this.account = res;
      this.skillsAccount = res.applicant.skills;

      this.editAccountForm = this.fb.group({
        Nickname: [this.account.nickname],
        FirstName: [this.account.firstName],
        LastName: [this.account.lastName],
        Email: [this.account.email],
        DateOfBirth: [this.account.dateOfBirth],
        LinkedIn: [this.account.linkedInUrl],
        Password: [''],
        ConfirmPassword: [''],
        Biography: [this.account.applicant.biography],
      });

    });
  }

  onSubmitEditAccount() {
    this.editAccountForm.addControl('Skills', new FormControl(this.skillsAccount));
    this._accountService.put(this.editAccountForm.value).subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit() {
    this.getIdFromParameter();
    this._skillService.get().subscribe(res => {
      this.skills = res;
    })
  }

}
