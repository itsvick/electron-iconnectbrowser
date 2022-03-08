import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequisitesComponent } from './pre-requisites.component';

describe('PreRequsitesComponent', () => {
  let component: PreRequisitesComponent;
  let fixture: ComponentFixture<PreRequisitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRequisitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
