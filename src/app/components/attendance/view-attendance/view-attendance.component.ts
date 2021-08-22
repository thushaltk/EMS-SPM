import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendance } from 'models/attendance.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'services/attendance.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  attendances: Attendance[] = [];
  filteredAttendances: Attendance[] = [];
  disable: boolean = true;
  search!: string;
  minDate!: Date;
  private subscription!: Subscription;
  isLoading = false;
  displayedColumns: string[] = ['fullName', 'nic', 'empID', 'date', 'designation', 'arriveTime', 'leaveTime', 'action'];

  constructor(private router: Router, private attendanceService: AttendanceService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.attendances = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendance: Attendance[]) => {
        this.attendances = attendance;
        this.filteredAttendances = attendance;
        this.isLoading = false;
      }
    );
  }

  onSearchByDate(searchDate: Date){
    this.filteredAttendances = this.attendances;
    let y = searchDate.getFullYear();
    let m = searchDate.getMonth();
    let d = searchDate.getDate();
    let sDate = y+'-'+(m+1)+'-'+d;

    this.filteredAttendances = this.attendances.filter((attData) => attData.date == sDate);

  }

}
