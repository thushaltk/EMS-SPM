import { OtherService } from 'services/other.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { EmpLoginComponent } from './components/Login/EmpLogin/emp-login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmpLoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [OtherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
