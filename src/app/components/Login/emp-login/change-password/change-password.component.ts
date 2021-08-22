import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'services/employees.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('createPwd', { static: false })
  createPwdForm: NgForm;
  private subscription!: Subscription;
  message: string = 'Password does not match try again!'
  showError: boolean = false;
  createPwdDetails = {
    nic: '',
    pwd: '',
    confpwd: ''
  }

  constructor(
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.createPwdForm.value.pwd !== this.createPwdForm.value.confpwd){
      this.showError = true;
      this._snackBar.open(this.message, 'OK');
    }else{
      this.createPwdDetails.nic = this.createPwdForm.value.nic;
      this.createPwdDetails.pwd = this.createPwdForm.value.pwd;
      this.createPwdDetails.confpwd = this.createPwdForm.value.confpwd;

      this.employeeService.updateEmployeePassword(this.createPwdDetails);
      this.subscription = this.employeeService.pwdChanged.subscribe(res => {
        if(res !== 'No user found'){
          this._snackBar.open('Password Updated Successfully', 'OK');
          setTimeout(()=>{
            this._snackBar.dismiss();
            this.router.navigate(['../../empLogin'], { relativeTo: this.route });
          },2000)
        }else if(res === 'No user found'){
          this._snackBar.open('Password Updated Failed', 'OK');
          setTimeout(()=>{
            this._snackBar.dismiss();
          },2000)
        }

      })
    }

  }

  onChange(){
    this._snackBar.dismiss();
  }

}
