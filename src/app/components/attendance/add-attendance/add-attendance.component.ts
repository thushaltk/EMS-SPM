import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Attendance } from 'models/attendance.model';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'services/attendance.service';
import { EmployeeService } from 'services/employees.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {
  @ViewChild('attn', { static: false }) addAttendanceForm!: NgForm;
  mode: string = "create";
  employeeName: string;
  todaysDate: Date = new Date();
  attendanceDate!: string;
  employeeID!: string;
  attendanceID!: string;
  empDesignation!: string;
  getDetailsBtnClicked: boolean = false;
  private subscription: Subscription;
  employeeDetails: Employees[] = [];
  attendanceDetails!: Attendance;
  attendances: Attendance = {
    id: '',
    fullName: '',
    empID: '',
    date: '',
    designation: '',
    arriveTime: '',
    leaveTime: '',
    nic: ''
  }

  checkboxesDataList = ['Manager', 'Engineer', 'Accountant', 'Supervisor', 'Labor', 'Driver', 'Cleaning Staff', 'Security Staff']

  constructor(private router: Router,
    private employeeDetailsService: EmployeeService,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let y = this.todaysDate.getFullYear();
    let m = this.todaysDate.getMonth();
    let d = this.todaysDate.getDate();
    this.attendanceDate = (y + '-' + (m + 1) + '-' + d);
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {

      //In this if condition, it checks whether the URL has an attendance ID...
      if (paramMap.has("id")) {
        console.log("id is = ", paramMap.get("id"));
        this.mode = "edit"; //If it has an ID, mode = "edit"
        this.attendanceID = paramMap.get("id"); //take attid and it assgint to attendanceID variable
        this.attendanceDetails = this.attendanceService.getAttendanceByID(this.attendanceID); //take the details from method
      } else {
        this.mode = "create";
        this.attendanceID = '';
      }

    }))
  }

  onSubmit() {
    //check the mode is it create if not it is edit
    if (this.mode === "create") {
      this.attendances.fullName = this.addAttendanceForm.value.empName;
      this.attendances.arriveTime = this.addAttendanceForm.value.arriveTime;
      this.attendances.leaveTime = this.addAttendanceForm.value.leaveTime;
      this.attendanceService.addAttendance(this.attendances);
      this.router.navigate(['../../attendance/view'], { relativeTo: this.route });
    } else {
      this.attendances.id = this.attendanceID;
      this.attendances.fullName = this.addAttendanceForm.value.empName;
      this.attendances.empID = this.attendanceDetails.empID;
      this.attendances.date = this.attendanceDate;
      this.attendances.designation = this.attendanceDetails.designation;
      this.attendances.arriveTime = this.addAttendanceForm.value.arriveTime;
      this.attendances.leaveTime = this.addAttendanceForm.value.leaveTime;
      this.attendances.nic = this.attendanceDetails.nic;
      this.attendanceService.updateAttendance(this.attendances);
      this.router.navigate(['../../../attendance/view'], { relativeTo: this.route });
    }

  }

  onGetDetails(nic: string) {
    this.getDetailsBtnClicked = true;
    this.employeeDetails = this.employeeDetailsService.getEmployee();
    this.subscription = this.employeeDetailsService.employeesChanged.subscribe(
      (employees: Employees[]) => {
        this.employeeDetails = employees;
        for (let emp of this.employeeDetails) {
          //checks whether the "nic" is equals to the nic in the employee details
          if (emp.nic === nic) {
            this.employeeName = emp.fullName;
            this.empDesignation = emp.designation;
            console.log(emp);
            this.employeeID = emp.empID;

            this.attendances.id = this.attendanceID;
            this.attendances.empID = emp.empID;
            this.attendances.date = this.attendanceDate;
            this.attendances.designation = emp.designation;
            this.attendances.nic = emp.nic;
            console.log(emp.nic);
          } else {
            continue;
          }

        }
      })
  }

  clear() {
    window.location.reload();
  }

}
