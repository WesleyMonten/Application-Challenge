import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentApplicationsComponent } from './assignment-applications.component';

describe('AssignmentApplicationsComponent', () => {
  let component: AssignmentApplicationsComponent;
  let fixture: ComponentFixture<AssignmentApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
