import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'services/announcements.service';

@Component({
  selector: 'app-view-announcements',
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.css']
})
export class ViewAnnouncementsComponent implements OnInit {
  announcements: Announcements[] = [];
  disable: boolean = true;
  search!: string;
  private subscription!: Subscription;
  isLoading = false;

  constructor(private router: Router, private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        this.isLoading = false;
      }
    );
    console.log(this.announcements);
  }
  onDelete(announcementID: string){
    this.announcementService.deleteAnnouncement(announcementID);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
