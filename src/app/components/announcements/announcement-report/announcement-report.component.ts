import { Component, OnDestroy, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from '../../../../../services/announcements.service';

@Component({
  selector: 'app-announcement-report',
  templateUrl: './announcement-report.component.html',
  styleUrls: ['./announcement-report.component.css']
})
export class AnnouncementReportComponent implements OnInit, OnDestroy {
  announcements: Announcements[] = [];
  newDate: string;
  private subscription: Subscription;
  constructor(private announcementService: AnnouncementService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        for(let ann of announcements){
          this.newDate = ann.date.split("-")[0] + "/" + ann.date.split("-")[1] + "/" + ann.date.split("-")[2]
          ann.date = this.newDate;

        }
      }
    );

  }

  generateReport(){
    setTimeout(() => {
      html2canvas(document.getElementById("tbl")).then(function(canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF.jsPDF();
        let image = new Image();
        image.src = 'assets/images/logo.jpg';
        var imgHeight = canvas.height * 210 / canvas.width;
        doc.text("Announcement Report", 55, 15);
        doc.addImage(image, 10, 5, 40, 20);
        doc.addImage(img,0, 30, 210, imgHeight);
        doc.save('announcement-report.pdf');
        });
    },1500)
  }

}
