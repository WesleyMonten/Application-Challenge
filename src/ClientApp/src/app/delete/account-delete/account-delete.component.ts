import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {

  validNickname: boolean = false;

  deleteAccountForm = this.fb.group({
    Nickname: ['', Validators.required]
  });


  constructor(public dialogRef: MatDialogRef<AccountDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Account, private fb: FormBuilder, private _accountService: AccountService, private router: Router) { }

  onChangeNickname(newValue) {
    console.log(newValue);
    if (newValue == this.data.nickname) {
      this.validNickname = true;
    } else {
      this.validNickname = false;
    }
  }

  onSubmitDeleteAccount() {
    this._accountService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['/login']);
    })
  }

  ngOnInit() {
  }

}
