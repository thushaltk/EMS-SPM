import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'services/announcements.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // announcements: Announcements[] = [];
  // private subscription: Subscription | undefined;
  isLoading = false;

  constructor(private router: Router,private announcementService: AnnouncementService,
    //private trainingProgramService: TrainingProgramsService
    ) { }

  ngOnInit(): void {
  }

}
