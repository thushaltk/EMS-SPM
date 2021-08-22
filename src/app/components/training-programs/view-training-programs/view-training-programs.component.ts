import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingPrograms } from 'models/trainingprograms.model';
import { Subscription } from 'rxjs';
import { TrainingProgramsService } from 'services/trainingprograms.service';

@Component({
  selector: 'app-view-training-programs',
  templateUrl: './view-training-programs.component.html',
  styleUrls: ['./view-training-programs.component.css'],
})
export class ViewTrainingProgramsComponent implements OnInit {
  trainingPrograms: TrainingPrograms[] = [];
  disable: boolean = true;
  search!: string;
  private subscription!: Subscription;
  isLoading = false;

  constructor(
    private router: Router,
    private trainingProgramService: TrainingProgramsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription =
      this.trainingProgramService.trainingProgamsChanged.subscribe(
        (trainingPrograms: TrainingPrograms[]) => {
          this.trainingPrograms = trainingPrograms;
          this.isLoading = false;
        }
      );
    console.log(this.trainingPrograms);
  }
  onDelete(trainingProgramsID: string) {
    this.trainingProgramService.deleteTrainingProgram(trainingProgramsID);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
