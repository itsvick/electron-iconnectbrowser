import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVideoViewComponent } from './lesson-video-view.component';

describe('LessonVideoViewComponent', () => {
  let component: LessonVideoViewComponent;
  let fixture: ComponentFixture<LessonVideoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVideoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
