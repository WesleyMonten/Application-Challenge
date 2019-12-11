import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed/feed.component';
import { ApplicantDetailComponent } from './detail/applicant-detail/applicant-detail.component';
import { ApplicantEditComponent } from './edit/applicant-edit/applicant-edit.component';
import { CompanyDetailComponent } from './detail/company-detail/company-detail.component';
import { CompanyEditComponent } from './edit/company-edit/company-edit.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full' },
  { path: 'applicant/:id', component: ApplicantDetailComponent },
  { path: 'edit-applicant/:id', component: ApplicantEditComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'edit-company/:id', component: CompanyEditComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
