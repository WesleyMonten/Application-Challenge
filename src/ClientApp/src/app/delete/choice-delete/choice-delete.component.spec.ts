import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceDeleteComponent } from './choice-delete.component';

describe('ChoiceDeleteComponent', () => {
  let component: ChoiceDeleteComponent;
  let fixture: ComponentFixture<ChoiceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
