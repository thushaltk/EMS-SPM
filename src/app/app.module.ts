import { OtherService } from 'services/other.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { EmpLoginComponent } from './components/Login/emp-login/emp-login.component';
import { AdminLoginComponent } from './components/Login/admin-login/admin-login.component';
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
import { ViewLeavesComponent } from './components/leaves/view-leaves/view-leaves.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AddAttendanceComponent } from './components/attendance/add-attendance/add-attendance.component';
import { TrainingProgramsService } from 'services/trainingprograms.service';
import { EmployeeService } from 'services/employees.service';
import { AttendanceService } from 'services/attendance.service';
import { EmpSelectComponent } from './components/employee/emp-select/emp-select.component';
import { EmpRegistryComponent } from './components/employee/emp-registry/emp-registry.component';
import { ViewAnnouncementsComponent } from './components/announcements/view-announcements/view-announcements.component';
import { ViewAttendanceComponent } from './components/attendance/view-attendance/view-attendance.component';
import { ViewTrainingProgramsComponent } from './components/training-programs/view-training-programs/view-training-programs.component';
import { NicValidationDirective } from './directives/nic-validation-directive';
import { EmpReportComponent } from './components/employee/emp-report/emp-report.component';
import { MyAccountComponent } from './components/employee/emp-profile/my-account/my-account.component';
import { EmpLeaveComponent } from './components/employee/emp-profile/emp-leave/emp-leave.component';
import { ViewLeaveComponent } from './components/employee/emp-profile/emp-leave/view-leave/view-leave.component';
import { ApplyLeaveComponent } from './components/employee/emp-profile/emp-leave/apply-leave/apply-leave.component';
import { LeavesService } from 'services/Leaves.service';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TrainingProgramsReportComponent } from './components/training-programs/training-programs-report/training-programs-report.component';
import { EmpTrainingProgramsComponent } from './components/employee/emp-profile/emp-training-programs/emp-training-programs.component';
import { AnnouncementReportComponent } from './components/announcements/announcement-report/announcement-report.component';
import { EmpAnnouncementsComponent } from './components/employee/emp-profile/emp-announcements/emp-announcements.component';


export function playerFactory() {
  return player;
}

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
    ViewLeavesComponent,
    AddEmployeeComponent,
    AttendanceComponent,
    ViewLeaveComponent,
    AddAttendanceComponent,
    EmpSelectComponent,
    EmpRegistryComponent,
    ViewAnnouncementsComponent,
    ViewAttendanceComponent,
    ViewTrainingProgramsComponent,
    ViewTrainingProgramsComponent,
    NicValidationDirective,
    EmpReportComponent,
    MyAccountComponent,
    EmpLeaveComponent,
    ApplyLeaveComponent,
    TrainingProgramsReportComponent,
    EmpTrainingProgramsComponent,
    AnnouncementReportComponent,
    EmpAnnouncementsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    OtherService,
    AnnouncementService,
    TrainingProgramsService,
    EmployeeService,
    AttendanceService,
    LeavesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
