import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed/feed.component';
import { ApplicantEditComponent } from './edit/applicant-edit/applicant-edit.component';
import { CompanyEditComponent } from './edit/company-edit/company-edit.component';
import { AccountDetailComponent } from './detail/account-detail/account-detail.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full' },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'edit-applicant/:id', component: ApplicantEditComponent },
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
