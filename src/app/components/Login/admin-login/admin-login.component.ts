import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  @ViewChild('adminlogin', { static: false })
  adminLoginForm!: NgForm;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let username = this.adminLoginForm.value.username;
    let pwd = this.adminLoginForm.value.pwd;

    if(username === "admin" && pwd === "admin"){
      this.router.navigate(['../../admin/dashboard'], { relativeTo: this.route });
    }else{
      this._snackBar.open("Login Failed..Try Again...", "OK");
    }


  }
}
