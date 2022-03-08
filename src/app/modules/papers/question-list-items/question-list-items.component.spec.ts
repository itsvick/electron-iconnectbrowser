import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListItemsComponent } from './question-list-items.component';

describe('QuestionListItemComponent', () => {
  let component: QuestionListItemsComponent;
  let fixture: ComponentFixture<QuestionListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
