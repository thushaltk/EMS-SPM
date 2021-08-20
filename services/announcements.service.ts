import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Announcements } from '../models/announcements.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AnnouncementService {
  announcementsChanged = new Subject<Announcements[]>();
  private announcementsArr: Announcements[] = [];
  private announcementUpdated = new Subject<Announcements[]>();

  constructor(private http: HttpClient) {}

  getAnnouncement() {
    this.http
      .get<{ message: string; announcements: any[] }>(
        'http://localhost:5000/api/announcements'
      )
      .pipe(
        map((announcementData) => {
          return announcementData.announcements.map((announcement) => {
            return {
              title: announcement.title,
              date: announcement.date,
              content: announcement.content,
              priority: announcement.priority,
              validity: announcement.validity,
              id: announcement._id,
            };
          });
        })
      )
      .subscribe((transformedAnnouncements) => {
        this.announcementsArr = transformedAnnouncements;
        this.announcementsChanged.next(this.announcementsArr.slice());
      });
    return this.announcementsArr.slice();
  }

  getAnnouncementByID(id: string) {
    return { ...this.announcementsArr.find((annID) => annID.id === id) };
    // this.http.get<{ message: string, announcements: any }>("http://localhost:3000/api/announcements/" + id)
    //   .pipe(map((announcementData) => {
    //     return announcementData.announcements.map(announcement => {
    //       return {
    //         title: announcement.title,
    //         date: announcement.date,
    //         content: announcement.content,
    //         priority: announcement.priority,
    //         validity: announcement.validity,
    //         id: announcement._id
    //       };
    //     });
    //   }))
    //   .subscribe((transformedAnnouncements) => {
    //     this.announcementsArr = transformedAnnouncements;
    //     this.announcementsChanged.next(this.announcementsArr.slice());
    //   });
    // return this.announcementsArr.slice();;
  }

  updateAnnouncement(announcement: Announcements) {
    const announcementArray: Announcements = {
      id: announcement.id,
      title: announcement.title,
      date: announcement.date,
      content: announcement.content,
      priority: announcement.priority,
      validity: announcement.validity,
    };
    this.http
      .put(
        'http://localhost:5000/api/announcements/' + announcement.id,
        announcementArray
      )
      .subscribe((response) => {
        const updatedAnnouncements = [...this.announcementsArr];
        const oldAnnouncementIndex = updatedAnnouncements.findIndex(
          (ann) => ann.id === announcementArray.id
        );
        updatedAnnouncements[oldAnnouncementIndex] = announcementArray;
        this.announcementsArr = updatedAnnouncements;
        this.announcementsChanged.next([...this.announcementsArr]);
      });
  }

  addAnnouncement(announcement: Announcements) {
    const announcementArray: Announcements = {
      id: announcement.id,
      title: announcement.title,
      date: announcement.date,
      content: announcement.content,
      priority: announcement.priority,
      validity: announcement.validity,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/announcements/add-announcement',
        announcementArray
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.announcementsArr.push(announcementArray);
        this.announcementsChanged.next(this.announcementsArr.slice());
      });
  }

  deleteAnnouncement(announcementID: string) {
    this.http
      .delete('http://localhost:5000/api/announcements/' + announcementID)
      .subscribe(() => {
        const updatedPosts = this.announcementsArr.filter(
          (announcements) => announcements.id !== announcementID
        );
        this.announcementsArr = updatedPosts;
        this.announcementsChanged.next(this.announcementsArr.slice());
      });
  }
}
