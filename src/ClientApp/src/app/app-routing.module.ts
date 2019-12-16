import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedComponent } from './feed/feed/feed.component';
import { AccountDetailComponent } from './detail/account-detail/account-detail.component';
import { AccountEditComponent } from './edit/account-edit/account-edit.component';
import { AssignmentDetailComponent } from './detail/assignment-detail/assignment-detail.component';
import { AuthGuard } from './security/auth.guard';
import { AssignmentEditComponent } from './edit/assignment-edit/assignment-edit.component';
import { AssignmentApplicationsComponent } from './detail/assignment-applications/assignment-applications.component';
import { CompanyGuard } from './security/company.guard';
import { CompanyCreateComponent } from './create/company-create/company-create.component';
import { AddReviewComponent } from './review/add-review/add-review.component';
import { EditReviewComponent } from './review/edit-review/edit-review.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit-account/:id', component: AccountEditComponent, canActivate: [AuthGuard] },
  { path: 'assignments', component: AssignmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit-assignment/:id', component: AssignmentEditComponent, canActivate: [AuthGuard] },
  { path: 'applications/:id', component: AssignmentApplicationsComponent, canActivate: [AuthGuard] },
  // { path: 'new-company', component: CompanyCreateComponent, canActivate: [AuthGuard, CompanyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'review/:id', component: AddReviewComponent, canActivate: [AuthGuard] },
  { path: 'editreview/:id', component: EditReviewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
