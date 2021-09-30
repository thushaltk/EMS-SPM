import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Leave } from 'models/Leave.model';
import { Subscription } from 'rxjs';
import { LeavesService } from 'services/Leaves.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../../../../../assets/animations/nodata.json',
  };
  private subscription: Subscription;
  isLoading: boolean = true;
  noData: boolean = false;
  empid: string = JSON.parse(localStorage.getItem('empid'));
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
    this.empid = JSON.parse(localStorage.getItem('empid'));
    if (this.empid) {
      this.getLeaves = this.leaveService.getLeaveByID(this.empid);
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

  onDelete(leaveId: string): void {
    this.leaveService.deleteLeave(leaveId);
    this._snackBar.open('Leave Deleted!', 'OK');
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 800)
  }

}
