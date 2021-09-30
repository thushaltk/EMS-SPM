import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Employees } from 'models/employees.model';
import { Leave } from 'models/Leave.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../../../../../services/employees.service';
import { LeavesService } from '../../../../../../../services/Leaves.service';
//import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
})
export class ApplyLeaveComponent implements OnInit, OnDestroy {
  @ViewChild('leave', { static: false }) addLeaveForm: NgForm;
  isNodata: boolean = true;
  viewTable: boolean = false;
  todate: any = new Date();
  empID: string;
  nic: string;
  isLoading: boolean = false;
  isSuccess: boolean = false;

  leave: Leave = {
    id: '',
    empID: '',
    time: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: '',
  };
  getEmployee: Employees[] = [];
  getleave: Leave[] = [];
  getleave2: Leave[] = [];
  private subscription: Subscription;
  dateToday: number = Date.now();

  constructor(
    private leaveService: LeavesService,
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    //private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.isSuccess = false;
    console.log(this.todate)
    this.route.params.subscribe((params: Params) => {
      this.nic = JSON.parse(localStorage.getItem('empDetails')).nic;
      console.log(this.nic);
      this.getEmployee = this.employeeService.getEmployee();
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.getEmployee = employees;
          for (let employee of this.getEmployee) {
            if (employee.nic === this.nic) {
              this.empID = employee.empID;
            }else{
              continue;
            }
          }
        }
      );
    });

    // this.getleave = this.leaveService.getLeave();
    // this.subscription = this.leaveService.leavesChanged.subscribe(
    //   (leaves: Leave[]) => {
    //     this.getleave = leaves;
    //     console.log(this.getleave.length);
    //     if (this.getleave.length === 0) {
    //       this.isNodata = true;
    //       console.log(this.getleave);
    //       console.log(this.nic);
    //     } else {
    //       this.isNodata = false;
    //       for (let leave of this.getleave) {
    //         if (leave.empID === this.empID) {
    //           this.getleave2.push(leave);
    //           console.log(this.getleave2);
    //         } else {
    //           continue;
    //         }
    //       }
    //     }
    //   }
    // );
  }

  onSubmit() {
    this.isLoading = true;
    this.leave.id = null;
    this.leave.empID = this.addLeaveForm.value.empid;
    this.leave.time = this.addLeaveForm.value.enterTime;
    this.leave.startDate = this.addLeaveForm.value.leaveStart.getFullYear()+'-'+(this.addLeaveForm.value.leaveStart.getMonth()+1)+'-'+this.addLeaveForm.value.leaveStart.getDate();
    this.leave.endDate = this.addLeaveForm.value.leaveEnd.getFullYear()+'-'+(this.addLeaveForm.value.leaveEnd.getMonth()+1)+'-'+this.addLeaveForm.value.leaveEnd.getDate();
    this.leave.reason = this.addLeaveForm.value.reason;
    this.leave.status = 'PENDING';

    this.leaveService.addLeave(this.leave);
    this.subscription = this.leaveService.leavesChanged.subscribe(data => {
      this.isLoading = false;
      this.isSuccess = true;
      this._snackBar.open('Leave request submitted!!!', 'OK');
      setTimeout(() => {
        this._snackBar.dismiss();
      },5000)
    })

    console.log(this.leave);
    //window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string) {
    this.leaveService.deleteLeave(id);
    window.location.reload();
  }
}










