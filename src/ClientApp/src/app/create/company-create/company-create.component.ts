import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  createCompanyForm = this.fb.group({
    Name: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    Email: ['', Validators.required],
    Biography: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private _location: Location) { }

  goBack() {
    this._location.back();
  }

  onSubmitCreateCompany() {

  }


  ngOnInit() {
  }

}
