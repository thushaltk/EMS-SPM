import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'services/employees.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  opened: boolean = true;
  panelOpenState: boolean = false;
  private subscription: Subscription;
  tempEmployees: Employees[] = [];
  employeeDetails: Employees = {
    imgUrl: '',
    id: '',
    address: '',
    cnumber: '',
    designation: '',
    dob: '',
    doj: '',
    email: '',
    empID: '',
    fullName: '',
    gender: '',
    nic: '',
    reason: ''
  };
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      //Checks whether the ID is in the URL
      if (paramMap.has("id")) {
        console.log("iD is here = ", paramMap.get("id"));
        this.employeeService.getEmployeeByID(paramMap.get("id"));
        this.subscription = this.employeeService.employeesChanged.subscribe(res => {
          console.log(res);
          if (res[0].id === paramMap.get("id")) {
            this.employeeDetails.imgUrl = res[0].imgUrl;
            this.employeeDetails.fullName = res[0].fullName;
            this.employeeDetails.empID = res[0].empID;
            this.employeeDetails.designation = res[0].designation;
            localStorage.setItem('empid',JSON.stringify(res[0].empID));
          }

        })
      } else {
        console.log("no ID");
      }

    }))
  };

  onLogout() {
    localStorage.removeItem('empDetails');
    localStorage.removeItem('islogged');
    this.router.navigate(['./login/empLogin'])
  }

}
