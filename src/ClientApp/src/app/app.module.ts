import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedModule } from './feed/feed.module';
import { DetailModule } from './detail/detail.module';
import { EditModule } from './edit/edit.module';
import { DeleteModule } from './delete/delete.module';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
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
    DeleteModule
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
