import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  opened: boolean = true;
  panelOpenState: boolean = false;
  
  
  constructor(
    
  ) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.announcements = this.announcementService.getAnnouncement();
    // this.subscription = this.announcementService.announcementsChanged.subscribe(
    //   (announcements: Announcements[]) => {
    //     this.announcements = announcements;
    //     this.isLoading = false;
    //   }
    // );
  }
}
