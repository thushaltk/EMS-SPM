import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendance } from 'models/attendance.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'services/attendance.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../../../../../assets/animations/nodata2.json',
  };
  attendances: Attendance[] = [];
  filteredAttendances: Attendance[] = [];
  disable: boolean = true;
  search!: string;
  minDate!: Date;
  private subscription!: Subscription;
  isLoading = false;
  noData: boolean = false;
  searchDate!: string;
  displayedColumns: string[] = ['fullName', 'nic', 'empID', 'date', 'designation', 'arriveTime', 'leaveTime', 'action'];

  constructor(private router: Router, private attendanceService: AttendanceService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.noData = false;
    this.isLoading = true;
    this.attendances = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendance: Attendance[]) => {
        this.attendances = attendance;
        this.filteredAttendances = attendance;
        this.isLoading = false;
        if (attendance.length <= 0) {
          this.noData = true;
        }
      }
    );
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onSearchByDate(searchDate: Date) {
    this.filteredAttendances = this.attendances;
    let y = searchDate.getFullYear();
    let m = searchDate.getMonth();
    let d = searchDate.getDate();
    let sDate = y + '-' + (m + 1) + '-' + d;
    this.searchDate = sDate;

    this.filteredAttendances = this.attendances.filter((attData) => attData.date == sDate);
    if (this.filteredAttendances.length <= 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }

  }

  generateReport() {
    html2canvas(document.getElementById("dataSet")).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF.jsPDF();
      let image = new Image();
      image.src = 'assets/images/logo.jpg';
      var imgHeight = canvas.height * 210 / canvas.width;
      var text = "Attendance Report";
      doc.text(text, 55, 15);
      doc.addImage(image, 10, 5, 40, 18);
      doc.addImage(img, 0, 30, 250, imgHeight);
      doc.save(`AttendanceReport.pdf`);
    });
  }


}
