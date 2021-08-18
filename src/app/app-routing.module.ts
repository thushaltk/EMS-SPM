import { AdminLoginComponent } from './components/Login/admin-login/admin-login.component';
import { EmpLoginComponent } from './components/Login/emp-login/emp-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Landingpage/landingpage.component';
import { ChangePasswordComponent } from './components/Login/emp-login/change-password/change-password.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';

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
    component: DashboardComponent,
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
