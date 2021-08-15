import { OtherService } from 'services/other.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { EmpLoginComponent } from './components/Login/emp-login/emp-login.component';
import {AdminLoginComponent} from './components/Login/admin-login/admin-login.component';
import { LandingPageComponent } from './components/Landingpage/landingpage.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangePasswordComponent } from './components/Login/emp-login/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    EmpLoginComponent,
    AdminLoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [OtherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
