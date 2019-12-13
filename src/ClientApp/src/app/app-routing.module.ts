import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedComponent } from './feed/feed/feed.component';
import { AccountDetailComponent } from './detail/account-detail/account-detail.component';
import { AccountEditComponent } from './edit/account-edit/account-edit.component';
import { AssignmentDetailComponent } from './detail/assignment-detail/assignment-detail.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'edit-account/:id', component: AccountEditComponent },
  { path: 'assignments', component: AssignmentDetailComponent },
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
