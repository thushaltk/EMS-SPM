import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingPrograms } from '../../../../../models/trainingprograms.model';
import { Subscription } from 'rxjs';
import { TrainingProgramsService } from '../../../../../services/trainingprograms.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-training-programs-report',
  templateUrl: './training-programs-report.component.html',
  styleUrls: ['./training-programs-report.component.css']
})
export class TrainingProgramsReportComponent implements OnInit, OnDestroy {
  trainingPrograms: TrainingPrograms[] = [];
  newDate: string;

  private subscription: Subscription;

  constructor(private trainingProgramService: TrainingProgramsService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription = this.trainingProgramService.trainingProgamsChanged.subscribe(
      (tps: TrainingPrograms[]) => {
        this.trainingPrograms = tps;
        console.log(tps)
        for(let tp of tps){
          this.newDate = tp.date.split("-")[0] + "/" + tp.date.split("-")[1] + "/" + tp.date.split("-")[2]
          tp.date = this.newDate;

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
        doc.text("Training Prorams Report", 55, 15);
        doc.addImage(image, 10, 5, 40, 20);
        doc.addImage(img, 0, 30, 210, imgHeight);
        doc.save('training-programs-report.pdf');
        });
    },1500)
  }

}
