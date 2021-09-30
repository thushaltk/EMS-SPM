import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceComponent } from './add-attendance.component';

import { AttendanceService } from 'services/attendance.service';
import { EmployeeService } from 'services/employees.service';

describe('AddAttendanceComponent', () => {
  let component: AddAttendanceComponent;
  let fixture: ComponentFixture<AddAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit() method', () => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    let employeeService = fixture.debugElement.injector.get(EmployeeService);
    let attendanceService = fixture.debugElement.injector.get(AttendanceService);
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
 });

  it('should check whether checkbox first element is Manager', () => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    let manager = component.checkboxesDataList[0];
    expect(manager).toEqual('Manager');
  });


});
