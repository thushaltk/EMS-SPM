import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrainingPrograms } from 'models/trainingprograms.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingProgramsService {
  trainingProgamsChanged = new Subject<TrainingPrograms[]>();
  private trainingProgramsArr: TrainingPrograms[] = [];

  constructor(private http: HttpClient) {}

  getTrainingPrograms() {
    this.http
      .get<{ message: string; trainingPrograms: any }>(
        'http://localhost:5000/api/training-programs/getTrainingPrograms'
      )
      .pipe(
        map((trainingProgramsData) => {
          return trainingProgramsData.trainingPrograms.map(
            (trainingProgram: {
              title: any;
              date: any;
              description: any;
              availability: any;
              venue: any;
              email: any;
              _id: any;
            }) => {
              return {
                title: trainingProgram.title,
                date: trainingProgram.date,
                description: trainingProgram.description,
                availability: trainingProgram.availability,
                venue: trainingProgram.venue,
                email: trainingProgram.email,
                id: trainingProgram._id,
              };
            }
          );
        })
      )
      .subscribe((transformedQuickLeaves) => {
        this.trainingProgramsArr = transformedQuickLeaves;
        this.trainingProgamsChanged.next(this.trainingProgramsArr.slice());
      });
    return this.trainingProgramsArr.slice();
  }

  getTrainingProgramByID(id: string) {
    return { ...this.trainingProgramsArr.find((trpID) => trpID.id === id) };
  }

  //add new training program
  addTrainingProgram(trainingProgram: TrainingPrograms) {
    const trainingProgramsArray: TrainingPrograms = {
      id: trainingProgram.id,
      title: trainingProgram.title,
      date: trainingProgram.date,
      description: trainingProgram.description,
      venue: trainingProgram.venue,
      availability: trainingProgram.availability,
      email: trainingProgram.email,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/training-programs/AddNewTrainingProgram',
        trainingProgramsArray
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.trainingProgramsArr.push(trainingProgramsArray);
        this.trainingProgamsChanged.next(this.trainingProgramsArr.slice());
      });
  }

  //update training program
  updateTrainingProgram(trainingProgram: TrainingPrograms) {
    const tpArray: TrainingPrograms = {
      id: trainingProgram.id,
      title: trainingProgram.title,
      date: trainingProgram.date,
      description: trainingProgram.description,
      venue: trainingProgram.venue,
      availability: trainingProgram.availability,
      email: trainingProgram.email,
    };
    this.http
      .put(
        'http://localhost:5000/api/training-programs/updateTrainingProgram/' +
          trainingProgram.id,
        tpArray
      )
      .subscribe((response) => {
        const updatedTP = [...this.trainingProgramsArr];
        const oldTPIndex = updatedTP.findIndex((tp) => tp.id === tpArray.id);
        updatedTP[oldTPIndex] = tpArray;
        this.trainingProgramsArr = updatedTP;
        this.trainingProgamsChanged.next([...this.trainingProgramsArr]);
      });
  }

  deleteTrainingProgram(trainingID: string) {
    this.http
      .delete('http://localhost:5000/api/training-programs/deleteTrainingProgram/' + trainingID)
      .subscribe(() => {
        const updatedPosts = this.trainingProgramsArr.filter(
          (tp) => tp.id !== trainingID
        );
        this.trainingProgramsArr = updatedPosts;
        this.trainingProgamsChanged.next(this.trainingProgramsArr.slice());
      });
  }
}
