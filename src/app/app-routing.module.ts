import { AdminLoginComponent } from './components/Login/admin-login/admin-login.component';
import { EmpLoginComponent } from './components/Login/emp-login/emp-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Landingpage/landingpage.component';
import { ChangePasswordComponent } from './components/Login/emp-login/change-password/change-password.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'login/empLogin',
    component: EmpLoginComponent,
    children: [
      { path: 'changePassword/:empID', component: ChangePasswordComponent },
    ],
  },
  { path: 'login/adminLogin', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
