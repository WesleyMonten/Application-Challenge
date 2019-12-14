import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentBoardComponent } from './assignment-board.component';

describe('AssignmentBoardComponent', () => {
  let component: AssignmentBoardComponent;
  let fixture: ComponentFixture<AssignmentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
