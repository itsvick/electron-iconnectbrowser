import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchQuestionVideoComponent } from './watch-question-video.component';

describe('WatchQuestionVideoComponent', () => {
  let component: WatchQuestionVideoComponent;
  let fixture: ComponentFixture<WatchQuestionVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchQuestionVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchQuestionVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
