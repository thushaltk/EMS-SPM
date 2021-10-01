import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingProgramsComponent } from './view-training-programs.component';

describe('ViewTrainingProgramsComponent', () => {
  let component: ViewTrainingProgramsComponent;
  let fixture: ComponentFixture<ViewTrainingProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainingProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrainingProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether the component is loading', () => {
    fixture = TestBed.createComponent(ViewTrainingProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let isLoading = component.isLoading;
    expect(isLoading).toBeTruthy();
  });
});
