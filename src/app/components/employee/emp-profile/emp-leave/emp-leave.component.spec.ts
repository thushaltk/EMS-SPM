import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveComponent } from './emp-leave.component';

describe('EmpLeaveComponent', () => {
  let component: EmpLeaveComponent;
  let fixture: ComponentFixture<EmpLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
