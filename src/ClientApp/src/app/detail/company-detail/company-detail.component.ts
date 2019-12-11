import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CompanyDeleteComponent } from 'src/app/delete/company-delete/company-delete.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(CompanyDeleteComponent, {
      width: '400px',
      data: { accountID: 1 }
    });
  }

  ngOnInit() {
  }

}
