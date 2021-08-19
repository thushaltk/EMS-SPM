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
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AddAnnouncementComponent } from './components/announcements/add-announcement/add-announcement.component';
import { AdminProfileComponent } from './components/Admin/admin-profile/admin-profile.component';
import { AnnouncementService } from 'services/announcements.service';
import { HttpClientModule } from '@angular/common/http';
import { TrainingProgramsComponent } from './components/training-programs/training-programs.component';
import { AddTrainingProgramsComponent } from './components/training-programs/add-training-programs/add-training-programs.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmpProfileComponent } from './components/employee/emp-profile/emp-profile.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ApplyLeaveComponent } from './components/leaves/apply-leave/apply-leave.component';
import { ViewLeaveComponent } from './components/leaves/view-leave/view-leave.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    EmpLoginComponent,
    AdminLoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    AnnouncementsComponent,
    AddAnnouncementComponent,
    AdminProfileComponent,
    TrainingProgramsComponent,
    AddTrainingProgramsComponent,
    EmployeeComponent,
    EmpProfileComponent,
    LeavesComponent,
    ApplyLeaveComponent,
    ViewLeaveComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [OtherService, AnnouncementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
