import { Component, OnInit, Inject } from '@angular/core';
import { CompanyDeleteComponent } from '../company-delete/company-delete.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';

@Component({
  selector: 'app-choice-delete',
  templateUrl: './choice-delete.component.html',
  styleUrls: ['./choice-delete.component.scss']
})
export class ChoiceDeleteComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ChoiceDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  openCompanyDialog(): void {
    this.dialogRef.close();
    this.dialog.open(CompanyDeleteComponent, {
      width: '400px',
      data: { companyID: this.data.companyID, name: this.data.name }
    });
  }

  openAccountDialog(): void {
    this.dialogRef.close();
    this.dialog.open(AccountDeleteComponent, {
      width: '400px',
      data: { accountID: this.data.accountID, nickname: this.data.nickname }
    });
  }

  ngOnInit() {
  }

}
