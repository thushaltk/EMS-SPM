import { OtherService } from '../../../../../services/other.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmployeeService } from 'services/employees.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false })
  emploginForm: NgForm;
  private subscription!: Subscription;
  message: string = 'Password does not match try again!'
  showError: boolean = false;
  loginDetails = {
    nic: '',
    pwd: '',
  }
  clicked: boolean = false;

  constructor(
    private otherService: OtherService,
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.clicked = this.otherService.clicked;
      console.log(this.clicked);

    }, 3000)
  }

  onNavigate() : void{
    this.router.navigate(['login/emp/changePassword']);
  }


  onChange(){
    this._snackBar.dismiss();
  }

  onSubmit(){
    this.loginDetails.nic = this.emploginForm.value.nic;
    this.loginDetails.pwd = this.emploginForm.value.pwd;

    this.employeeService.checkPassword(this.loginDetails);
    this.subscription = this.employeeService.pwdChecked.subscribe((res : any) => {
      if(res.resMsg === 'No user found'){
        this._snackBar.open('Login Failed', 'OK');
      }else if(res.resMsg === 'user found'){
        this._snackBar.open('Login Success', 'OK');
        localStorage.setItem('empDetails', JSON.stringify(res.resData));
        localStorage.setItem('islogged', JSON.stringify(true));
        setTimeout(() => {
          this._snackBar.dismiss();
          this.router.navigate([`emp/empProfile/${res.resData._id}/account`]);
        },200)
      }
    })

  }


}
