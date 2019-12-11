import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDeleteComponent } from './applicant-delete.component';

describe('ApplicantDeleteComponent', () => {
  let component: ApplicantDeleteComponent;
  let fixture: ComponentFixture<ApplicantDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
