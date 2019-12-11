import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-applicant-delete',
  templateUrl: './applicant-delete.component.html',
  styleUrls: ['./applicant-delete.component.scss']
})
export class ApplicantDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ApplicantDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Account) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
