import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employees } from 'models/employees.model';
import { EmployeeService } from 'services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('emp', {static: false}) addEmployee!: NgForm;
  empID!: string;
  mode : string = "create";
  employeeID!: string;
  demoBtnClicked: boolean = false;
  nicInvalid: boolean = true;
  dateOfBirth!: any;
  dateOfJoining!: any;
  employeeDetails: Employees[] = [];
  empDetails!: Employees;

  employees: Employees = {
    id: '',
    fullName: '',
    dob: '',
    nic: '',
    empID: '',
    gender: '',
    address: '',
    cnumber: '',
    email: '',
    designation: '',
    doj: '',
    reason: ''
  };
  submitted=false;

  checkboxesDataList = ['Manager', 'Engineer', 'Accountant', 'Supervisor', 'Labor', 'Driver', 'Cleaning Staff', 'Security Staff']

  constructor(private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Below condition checks whether the URL has an ID
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      //Checks whether the ID is in the URL
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.employeeID = paramMap.get("id");
        this.employeeDetails = this.employeeService.getEmployee();
        for(let emp of this.employeeDetails){
          if(emp.id === this.employeeID){
            this.empDetails = emp;
            console.log(this.employeeDetails);
            this.empID = emp.empID;
            this.empDetails.dob = new Date(emp.dob).toISOString();
            this.empDetails.doj = new Date(emp.doj).toISOString();
          }else{
            continue;
          }

        }
      } else {
        this.mode = "create";
        this.employeeID = '';
        this.empID = "EMP"+Math.floor((Math.random() * 99999) + 10000).toString();
      }

    }))
  }

  nicValidate(nic: string){
    console.log(nic)
    if(nic.endsWith("V") && nic.length == 10){
      this.nicInvalid = false;
      console.log(this.nicInvalid);
    }else{
      this.nicInvalid = true;
      console.log(this.nicInvalid);
    }

  }

  onSubmit() {
    this.dateOfBirth = new Date(this.addEmployee.value.dob);
    let y = this.dateOfBirth.getFullYear();
    let m = this.dateOfBirth.getMonth();
    let d = this.dateOfBirth.getDate();
    this.dateOfBirth = (y + '-' + (m + 1) + '-' + d);

    this.dateOfJoining = new Date(this.addEmployee.value.doj);
    let year = this.dateOfJoining.getFullYear();
    let month = this.dateOfJoining.getMonth();
    let date = this.dateOfJoining.getDate();
    this.dateOfJoining = (year + '-' + (month + 1) + '-' + date);

    this.submitted = true;
    this.employees.id = this.employeeID;
    this.employees.empID = this.empID;
    this.employees.fullName = this.addEmployee.value.fullName;
    this.employees.dob = this.dateOfBirth;
    this.employees.nic = this.addEmployee.value.nic;
    this.employees.gender = this.addEmployee.value.gender;
    this.employees.address = this.addEmployee.value.address;
    this.employees.cnumber = this.addEmployee.value.cnumber;
    this.employees.email = this.addEmployee.value.email;
    this.employees.designation = this.addEmployee.value.designation;
    this.employees.doj = this.dateOfJoining;
    this.employees.reason = this.addEmployee.value.reason;

    if (this.mode === "create") {
      this.employeeService.addEmployee(this.employees);
      this.router.navigate(['../view'], {relativeTo: this.route});
    } else {
      this.employeeService.updateEmployees(this.employees);
      this.router.navigate(['../../', this.employees.designation], {relativeTo: this.route});
    }

  }



}
