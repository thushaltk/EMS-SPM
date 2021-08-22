import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TrainingPrograms } from 'models/trainingprograms.model';
import { TrainingProgramsService } from 'services/trainingprograms.service';

@Component({
  selector: 'app-add-training-programs',
  templateUrl: './add-training-programs.component.html',
  styleUrls: ['./add-training-programs.component.css'],
})
export class AddTrainingProgramsComponent implements OnInit {
  @ViewChild('tp', { static: false })
  addTrainingProgramsForm!: NgForm;
  mode = 'create';
  private trainingProgramID!: string;
  conductingDate!: string;
  demoBtnClicked: boolean = false;
  designations = new FormControl();
  minDate!: Date;
  tpDetails!: TrainingPrograms;
  trainingPrograms: TrainingPrograms = {
    id: '',
    title: '',
    date: '',
    description: '',
    availability: [],
    venue: '',
    email: '',
  };

  checkboxesDataList = [
    'Manager',
    'Engineer',
    'Accountant',
    'Supervisor',
    'Labor',
    'Driver',
    'Cleaning Staff',
    'Security Staff',
  ];

  constructor(
    private router: Router,
    private trainingProgramsService: TrainingProgramsService,
    private route: ActivatedRoute
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('tpID')) {
        this.mode = 'edit';
        this.trainingProgramID = paramMap.get('tpID');
        this.tpDetails = this.trainingProgramsService.getTrainingProgramByID(
          this.trainingProgramID
        );
      } else {
        this.mode = 'create';
        this.trainingProgramID = '';
      }
    });
  }

  onSubmit() {
    this.demoBtnClicked = false;
    console.log(this.designations.value);
    console.log(this.addTrainingProgramsForm.value);
    let y = this.addTrainingProgramsForm.value.dateConducting.getFullYear();
    let m = this.addTrainingProgramsForm.value.dateConducting.getMonth();
    let d = this.addTrainingProgramsForm.value.dateConducting.getDate();
    this.conductingDate = y + '-' + (m + 1) + '-' + d;

    this.trainingPrograms.id = this.trainingProgramID;
    this.trainingPrograms.title = this.addTrainingProgramsForm.value.title;
    this.trainingPrograms.date = this.conductingDate;
    this.trainingPrograms.description = this.addTrainingProgramsForm.value.desc;
    this.trainingPrograms.venue = this.addTrainingProgramsForm.value.venue;
    this.trainingPrograms.availability = this.designations.value;
    this.trainingPrograms.email = this.addTrainingProgramsForm.value.email;

    //checks wheather update or new
    if (this.mode === 'create') {
      this.trainingProgramsService.addTrainingProgram(this.trainingPrograms);
      this.router.navigate(['../view'], { relativeTo: this.route });
    } else {
      this.trainingProgramsService.updateTrainingProgram(this.trainingPrograms);
      this.router.navigate(['../../view'], { relativeTo: this.route });
    }
  }
}
