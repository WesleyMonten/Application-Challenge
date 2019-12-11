import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantDeleteComponent } from 'src/app/delete/applicant-delete/applicant-delete.component';
@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ApplicantDeleteComponent, {
      width: '400px',
      data: { accountID: 1 }
    });
  }

  ngOnInit() {
  }
}
