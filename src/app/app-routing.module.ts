import { AddTrainingProgramsComponent } from './components/training-programs/add-training-programs/add-training-programs.component';
import { AdminLoginComponent } from './components/Login/admin-login/admin-login.component';
import { EmpLoginComponent } from './components/Login/emp-login/emp-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Landingpage/landingpage.component';
import { ChangePasswordComponent } from './components/Login/emp-login/change-password/change-password.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { AddAnnouncementComponent } from './components/announcements/add-announcement/add-announcement.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AdminProfileComponent } from './components/Admin/admin-profile/admin-profile.component';
import { TrainingProgramsComponent } from './components/training-programs/training-programs.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmpProfileComponent } from './components/employee/emp-profile/emp-profile.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AddAttendanceComponent } from './components/attendance/add-attendance/add-attendance.component';
import { EmpSelectComponent } from './components/employee/emp-select/emp-select.component';
import { EmpRegistryComponent } from './components/employee/emp-registry/emp-registry.component';
import { ViewAnnouncementsComponent } from './components/announcements/view-announcements/view-announcements.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'login/empLogin',
    component: EmpLoginComponent,
  },
  { path: 'login/emp/changePassword', component: ChangePasswordComponent },
  { path: 'login/adminLogin', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminProfileComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        children: [{ path: 'add', component: AddAnnouncementComponent }, { path: 'view', component: ViewAnnouncementsComponent }],
      },
      {
        path: 'training-programs',
        component: TrainingProgramsComponent,
        children: [
          { path: 'add', component: AddTrainingProgramsComponent },
        ],
      },
      { path: 'employee/add', component: AddEmployeeComponent },
      { path: 'employee/view', component: EmpSelectComponent },
      { path: 'employee/:designation', component: EmpRegistryComponent },
      { path: 'employee/edit/:id', component: AddEmployeeComponent },
      {
        path: 'attendance',
        component: AttendanceComponent,
        children: [{ path: 'add', component: AddAttendanceComponent }],
      },
    ],
  },
  {
    path: 'emp',
    component: EmployeeComponent,
    children: [
      { path: 'empProfile', component: EmpProfileComponent }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
