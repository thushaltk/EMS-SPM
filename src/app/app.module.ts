import { OtherService } from 'services/other.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { EmpLoginComponent } from './components/Login/EmpLogin/emp-login.component';
import { LandingPageComponent } from './components/Landingpage/landingpage.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    EmpLoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [OtherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
