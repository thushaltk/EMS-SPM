import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Leave } from '../models/Leave.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LeavesService {
  leavesChanged = new Subject<Leave[]>();
  leavesUpdated = new Subject<any>();
  private leavesArr: Leave[] = [];

  constructor(private http: HttpClient) { }

  getLeave() {
    this.http.get<{ message: string, data: any }>('http://localhost:5000/api/leaves/getLeaves')
      .pipe(map((leavesData) => {
        return leavesData.data.map((leave: { _id: any; empID: any; time: any; startDate: any; endDate: any; reason: any; status: any }) => {
          return {
            empID: leave.empID,
            time: leave.time,
            startDate: leave.startDate,
            endDate: leave.endDate,
            id: leave._id,
            reason: leave.reason,
            status: leave.status
          };
        });
      }))
      .subscribe((transformedLeaves) => {
        this.leavesArr = transformedLeaves;
        this.leavesChanged.next(this.leavesArr.slice());
      });
    return this.leavesArr.slice();
  }

  getLeaveByID(id: string) {
    this.http.get<{ message: string, data: any }>("http://localhost:5000/api/leaves/getLeaveByID/" + id)
      .pipe(map((leavesData) => {
        return leavesData.data.map((leave: { _id: any; empID: any; time: any; startDate: any; endDate: any; reason: any; status: any }) => {
          return {
            empID: leave.empID,
            time: leave.time,
            startDate: leave.startDate,
            endDate: leave.endDate,
            id: leave._id,
            reason: leave.reason,
            status: leave.status
          };
        });
      }))
      .subscribe((transformedLeaves) => {
        this.leavesArr = transformedLeaves;
        this.leavesChanged.next(this.leavesArr.slice());
      });
    return this.leavesArr.slice();
  }

  addLeave(leave: Leave) {
    console.log(leave)
    const leaveArray: Leave = {
      id: leave.id,
      empID: leave.empID,
      time: leave.time,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    };
    this.http.post<{ message: string }>('http://localhost:5000/api/leaves/add-leave', leaveArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.leavesArr.push(leaveArray);
        this.leavesChanged.next(this.leavesArr.slice());
      });

  }

  deleteLeave(leaveID: string) {
    this.http.delete("http://localhost:5000/api/leaves/deleteLeave/" + leaveID)
      .subscribe(() => {
        const updatedLeave = this.leavesArr.filter(leaves => leaves.id !== leaveID);
        this.leavesArr = updatedLeave;
        this.leavesChanged.next(this.leavesArr.slice());
      })
  }

  updateLeaveStatus(leaveID: string, leave: Leave) {
    const leaveArray: Leave = {
      id: leave.id,
      empID: leave.empID,
      time: leave.time,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    };
    this.http.put("http://localhost:5000/api/leaves/updateLeave/" + leaveID, leaveArray)
      .subscribe(response => {
        this.leavesUpdated.next(response) });
  }
}
