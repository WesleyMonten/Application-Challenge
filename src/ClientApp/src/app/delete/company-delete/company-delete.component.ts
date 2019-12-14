import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.scss']
})
export class CompanyDeleteComponent implements OnInit {

  validName: boolean = false;

  deleteCompanyForm = this.fb.group({
    Name: ['', Validators.required]
  });


  constructor(public dialogRef: MatDialogRef<AccountDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Company, private fb: FormBuilder, private _companyService: CompanyService, private router: Router) { }

  onChangeName(newValue) {
    console.log(newValue);
    if (newValue == this.data.name) {
      this.validName = true;
    } else {
      this.validName = false;
    }
  }

  onSubmitDeleteCompany() {
    this._companyService.delete(this.data.companyId).subscribe(() => {
      this.dialogRef.close();
    })
  }

  ngOnInit() {
  }

}
