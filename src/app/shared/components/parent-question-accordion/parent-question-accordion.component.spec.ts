import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentQuestionAccordionComponent } from './parent-question-accordion.component';

describe('ParentQuestionAccordianComponent', () => {
  let component: ParentQuestionAccordionComponent;
  let fixture: ComponentFixture<ParentQuestionAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentQuestionAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentQuestionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
