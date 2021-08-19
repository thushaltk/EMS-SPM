import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramsComponent } from './training-programs.component';

describe('TrainingProgramsComponent', () => {
  let component: TrainingProgramsComponent;
  let fixture: ComponentFixture<TrainingProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
