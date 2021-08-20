import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Attendance } from 'models/attendance.model';
import { Employees } from 'models/employees.model';
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
  todaysDate: Date = new Date();
  attendanceDate!: string;
  employeeID! : string;
  attendanceID!: string;
  empDesignation!: string;
  employeeDetails : Employees[] = [];
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
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {

      //In this if condition, it checks whether the URL has an attendance ID...
      if (paramMap.has("attid")) {
        this.mode = "edit"; //If it has an ID, mode = "edit"
        this.attendanceID = JSON.parse(paramMap.get("attid") || ''); //take attid and it assgint to attendanceID variable
        // this.attendanceDetails = JSON.parse(this.attendanceService.getAttendanceByID(this.attendanceID)); //take the details from method
      } else {
        this.mode = "create";
        this.attendanceID = '';
      }

    }))
  }

  onSubmit(){
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDay();
    this.attendanceDate = (y+'-'+(m+1)+'-'+d);
    console.log(this.addAttendanceForm.value);
    this.attendances.id = this.attendanceID;
    this.attendances.fullName = this.addAttendanceForm.value.empName;
    this.attendances.empID = this.addAttendanceForm.value.empID;
    this.attendances.date = this.attendanceDate;
    this.attendances.designation = this.addAttendanceForm.value.designation;
    this.attendances.arriveTime = this.addAttendanceForm.value.arriveTime;
    this.attendances.leaveTime = this.addAttendanceForm.value.leaveTime;
    this.attendances.nic = this.addAttendanceForm.value.nic;
    console.log(this.attendances);

    //check the mode is it create if not it is edit
    if (this.mode === "create") {
      this.attendanceService.addAttendance(this.attendances);
      this.router.navigate(['../../attendance'], { relativeTo: this.route });
    } else {
      this.attendanceService.updateAttendance(this.attendances);
      this.router.navigate(['../../../attendance'], { relativeTo: this.route });
    }

  }

  onGetDetails(nic: string){

  }

}
