import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementService } from 'services/announcements.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css'],
})
export class AddAnnouncementComponent implements OnInit {
  selectedPriority!: string;
  priorities: string[] = ['High', 'Normal'];
  @ViewChild('ann', { static: false })
  addAnnouncementForm!: NgForm;
  private mode = 'create';
  minDate!: Date;
  publishedDate!: string;
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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.minDate = new Date();
   }

  ngOnInit() {
    this.demoBtnClicked = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('annID')) {
        this.mode = 'edit';
        this.announcementID = paramMap.get('annID');
        this.announcementsDetails =
          this.announcementService.getAnnouncementByID(this.announcementID);
      } else {
        this.mode = 'create';
        this.announcementID = '';
      }
    });
  }

  onSubmit(){
    let y = this.addAnnouncementForm.value.datePublished.getFullYear();
    let m = this.addAnnouncementForm.value.datePublished.getMonth();
    let d = this.addAnnouncementForm.value.datePublished.getDate();
    this.publishedDate =  y+'-'+(m+1)+'-'+d;
    console.log(this.publishedDate);
    this.submitted = true;
    this.announcements.id = this.announcementID;
    this.announcements.title = this.addAnnouncementForm.value.title;
    this.announcements.date = this.publishedDate;
    this.announcements.content = this.addAnnouncementForm.value.content;
    this.announcements.priority = this.addAnnouncementForm.value.priority;
    this.announcements.validity = this.addAnnouncementForm.value.validity;

    if (this.mode === "create") {
      this.announcementService.addAnnouncement(this.announcements);
      this.toastr.success('Announcement Published Successfully');
      this.router.navigate(['../view'], { relativeTo: this.route });
    } else {
      this.announcementService.updateAnnouncement(this.announcements);
      this.toastr.success('Announcement Updated Successfully');
      this.router.navigate(['../../view'], { relativeTo: this.route });
    }

  }
}

