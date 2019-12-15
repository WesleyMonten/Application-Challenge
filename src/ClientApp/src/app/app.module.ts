import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedModule } from './feed/feed.module';
import { DetailModule } from './detail/detail.module';
import { EditModule } from './edit/edit.module';
import { DeleteModule } from './delete/delete.module';
import { AccountService } from './services/account.service';
import { AssignmentService } from './services/assignment.service';
import { ApplicationService } from './services/application.service';
import { CompanyService } from './services/company.service';
import { SkillService } from './services/skill.service';
import { ReviewService } from './services/review.service';
import { AuthService } from './services/auth.service';
import { SecurityInterceptor } from "./security/security.interceptor";
import { AuthGuard } from './security/auth.guard';
import { ApplicantService } from './services/applicant.service';
import { CompanyGuard } from './security/company.guard';
import { CreateModule } from './create/create.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FeedModule,
    DetailModule,
    EditModule,
    DeleteModule,
    CreateModule
  ],
  providers: [
    AccountService,
    AssignmentService,
    ApplicationService,
    CompanyService,
    SkillService,
    ReviewService,
    AuthService,
    AuthGuard,
    CompanyGuard,
    ApplicantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
