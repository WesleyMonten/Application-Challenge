import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.scss']
})
export class CompanyDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Account) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
