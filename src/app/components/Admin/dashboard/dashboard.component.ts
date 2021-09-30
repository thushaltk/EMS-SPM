import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { Attendance } from 'models/attendance.model';
import { Employees } from 'models/employees.model';
import { TrainingPrograms } from 'models/trainingprograms.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'services/announcements.service';
import { AttendanceService } from 'services/attendance.service';
import { EmployeeService } from 'services/employees.service';
import { TrainingProgramsService } from 'services/trainingprograms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trainingPrograms: TrainingPrograms[] = [];
  announcements: Announcements[] = [];
  employees: Employees[] = [];
  attendances: Attendance[] = [];
  filteredAttendances: Attendance[]=[];
  today: Date = new Date();
  totEmployees!: number;
  totAttendance!: number;
  totAbsent!: number;
  private subscription: Subscription;
  isLoading = false;

  constructor(
    private announcementService: AnnouncementService,
    private trainingProgramService: TrainingProgramsService,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService) {
    let y = this.today.getFullYear();
    let m = this.today.getMonth();
    let d = this.today.getDate();
    let sDate = y + '-' + (m + 1) + '-' + d;

    this.employees = this.employeeService.getEmployee();
    this.subscription = this.employeeService.employeesChanged.subscribe(
      (employees: Employees[]) => {
        this.employees = employees;
        console.log(employees)
        this.totEmployees = this.employees.length;
      }
    );

    this.attendances = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendances: Attendance[]) => {
        this.filteredAttendances = attendances.filter((attData) => attData.date == sDate);

        this.totAttendance = this.filteredAttendances.length;

        this.totAbsent = this.totEmployees - this.totAttendance;
        console.log(this.totAbsent)
      }
    );

  }

  ngOnInit() {
    let y = this.today.getFullYear();
    let m = this.today.getMonth();
    let d = this.today.getDate();
    let sDate = y + '-' + (m + 1) + '-' + d;

    this.isLoading = true;
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        this.isLoading = false;
      }
    );


    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription = this.trainingProgramService.trainingProgamsChanged.subscribe(
      (trainingPrograms: TrainingPrograms[]) => {
        this.trainingPrograms = trainingPrograms;

      }
    );

    this.attendances = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendances: Attendance[]) => {
        this.filteredAttendances = attendances.filter((attData) => attData.date == sDate);

        this.totAttendance = this.filteredAttendances.length;

        this.totAbsent = this.totEmployees - this.totAttendance;
        console.log(this.totAbsent)
      }
    );

  }


}
