import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { AnnouncementService } from 'services/announcements.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css'],
})
export class AddAnnouncementComponent implements OnInit {
  @ViewChild('ann', { static: false })
  addAnnouncementForm!: NgForm;
  defaultValue = 'choose';
  defaultValue2 = 'chooseValidity';
  private mode = 'create';
  dateToday!: string;
  demoBtnClicked: boolean = false;
  private announcementID!: string;
  announcementsDetails!: Announcements;
  announcements: Announcements = {
    id: '',
    title: '',
    date: '',
    content: '',
    priority: '',
    validity: '',
  };
  submitted = false;

  constructor(
    private router: Router,
    private announcementService: AnnouncementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.demoBtnClicked = false;
    // let day = new Date().getDate();
    // let month = new Date().getMonth();
    // let year = new Date().getFullYear();
    // this.dateToday = year + '-' + (month + 1) + '-' + day;
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('annID')) {
    //     this.mode = 'edit';
    //     this.announcementID = paramMap.get('annID');
    //     this.announcementsDetails =
    //       this.announcementService.getAnnouncementByID(this.announcementID);
    //   } else {
    //     this.mode = 'create';
    //     this.announcementID;
    //   }
    // });
  }
}
