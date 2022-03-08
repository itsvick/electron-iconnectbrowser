import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectResourceCardComponent } from './subject-resource-card.component';

describe('SubjectResourceCardComponent', () => {
  let component: SubjectResourceCardComponent;
  let fixture: ComponentFixture<SubjectResourceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectResourceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectResourceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
