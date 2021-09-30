import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Leave } from 'models/Leave.model';
import { Subscription } from 'rxjs';
import { LeavesService } from 'services/Leaves.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../../../../../assets/animations/nodata.json',
  };
  private subscription: Subscription;
  isLoading: boolean = true;
  noData: boolean = false;
  leave: Leave = {
    id: '',
    empID: '',
    endDate: '',
    reason: '',
    startDate: '',
    status: '',
    time: ''
  }
  getLeaves: Leave[] = [];
  filteredLeaves: Leave[] = [];

  constructor(
    private leaveService: LeavesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
      this.getLeaves = this.leaveService.getLeave();
      this.subscription = this.leaveService.leavesChanged.subscribe(
        (leaves: Leave[]) => {
          this.getLeaves = leaves;
          this.filteredLeaves = leaves;
          this.isLoading = false;
          if(leaves.length <= 0){
            this.noData = true;
          }
        }
      )


  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onSearchByDate(searchDate: Date): void {
    this.filteredLeaves = this.getLeaves;
    let y = searchDate.getFullYear();
    let m = searchDate.getMonth();
    let d = searchDate.getDate();
    let sDate = y + '-' + (m + 1) + '-' + d;

    this.filteredLeaves = this.getLeaves.filter((lvData) => lvData.startDate == sDate);
  }

  onReject(leave: Leave): void {
    this.isLoading = true;
    this.leave.empID = leave.empID;
    this.leave.endDate = leave.endDate;
    this.leave.id = leave.id;
    this.leave.reason = leave.reason;
    this.leave.startDate = leave.startDate;
    this.leave.status = "REJECTED";
    this.leave.time = leave.time;

    this.leaveService.updateLeaveStatus(leave.id, this.leave);
    this.leaveService.leavesUpdated.subscribe(res => {
      if(res){
        if(res.message === "Updated successfully"){

          this._snackBar.open('Leave Rejected!', 'OK');
          setTimeout(() => {

            this._snackBar.dismiss();
            window.location.reload();
          }, 1000)
        }
      }else{
        this._snackBar.open('ERROR!', 'OK');
      }
    })


  }

  onApprove(leave: Leave): void{
    this.isLoading = true;
    this.leave.empID = leave.empID;
    this.leave.endDate = leave.endDate;
    this.leave.id = leave.id;
    this.leave.reason = leave.reason;
    this.leave.startDate = leave.startDate;
    this.leave.status = "APPROVED";
    this.leave.time = leave.time;

    this.leaveService.updateLeaveStatus(leave.id, this.leave);
    this.leaveService.leavesUpdated.subscribe(res => {
      if(res){
        if(res.message === "Updated successfully"){

          this._snackBar.open('Leave Updated!', 'OK');
          setTimeout(() => {
            this._snackBar.dismiss();
            window.location.reload();
          }, 1000)
        }
      }else{
        this._snackBar.open('ERROR!', 'OK');
      }
    })
  }

}
