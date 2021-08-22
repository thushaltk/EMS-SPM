import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AttendanceService {
  attendanceChanged = new Subject<Attendance[]>();
  private attendanceArr: Attendance[] = [];

  constructor(private http: HttpClient) { }

  getAttendance() {
    this.http.get<{ message: string, attendances: any }>('http://localhost:5000/api/attendance/getAttendances')
      .pipe(map((attendanceData) => {
        return attendanceData.attendances.map((attendance: { fullName: any; nic: any; empID: any; date: any; designation: any; arriveTime: any; leaveTime: any; _id: any; }) => {
          return {
            fullName: attendance.fullName,
            nic: attendance.nic,
            empID: attendance.empID,
            date: attendance.date,
            designation: attendance.designation,
            arriveTime: attendance.arriveTime,
            leaveTime: attendance.leaveTime,
            id: attendance._id
          };
        });
      }))
      .subscribe((transformedAttendances) => {
        this.attendanceArr = transformedAttendances;
        this.attendanceChanged.next(this.attendanceArr.slice());
      });
    return this.attendanceArr.slice();
  }

  getAttendanceByID(id: string) {
    return {...this.attendanceArr.find(attID => attID.id === id)};
  }

  //Add Attendnace details to the DB
  addAttendance(attendance: Attendance) {
    const attendanceArray: Attendance = {
      id: attendance.id,
      fullName: attendance.fullName,
      nic: attendance.nic,
      date: attendance.date,
      empID: attendance.empID,
      designation: attendance.designation,
      arriveTime: attendance.arriveTime,
      leaveTime: attendance.leaveTime
    };
    this.http.post<{ message: string }>('http://localhost:5000/api/attendance/addNewAttendance', attendanceArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.attendanceArr.push(attendanceArray);
        this.attendanceChanged.next(this.attendanceArr.slice());
      });

  }

  //Below functions is used to update attendance records.
  //It takes "attendance" object and assigns to "attendanceArray",
  updateAttendance(attendance: Attendance) {
    const attendanceArray: Attendance = {
      id: attendance.id,
      fullName: attendance.fullName,
      nic: attendance.nic,
      date: attendance.date,
      empID: attendance.empID,
      designation: attendance.designation,
      arriveTime: attendance.arriveTime,
      leaveTime: attendance.leaveTime
    };
    //Then we send a "put" request to the server with the attendanceID and the attendanceArray
    this.http.put('http://localhost:5000/api/attendance/updateAttendance/' + attendance.id, attendanceArray)
      .subscribe(response => {
        const updatedAttendances = [...this.attendanceArr];
        const oldAttendanceIndex = updatedAttendances.findIndex(att => att.id === attendanceArray.id);
        updatedAttendances[oldAttendanceIndex] = attendanceArray;
        this.attendanceArr = updatedAttendances;
        this.attendanceChanged.next([...this.attendanceArr]);
      });
  }

  //attendnace delete by DB ID
  deleteAttendance(attendanceID: string) {
    this.http.delete("http://localhost:5000/api/attendance/" + attendanceID)
      .subscribe(() => {
        const updatedAttendance = this.attendanceArr.filter(attendances => attendances.id !== attendanceID);
        this.attendanceArr = updatedAttendance;
        this.attendanceChanged.next(this.attendanceArr.slice());
      })
  }




}
