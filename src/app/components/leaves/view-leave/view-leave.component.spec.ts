import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveComponent } from './view-leave.component';

describe('ViewLeaveComponent', () => {
  let component: ViewLeaveComponent;
  let fixture: ComponentFixture<ViewLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
