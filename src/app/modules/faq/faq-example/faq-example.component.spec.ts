import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqExampleComponent } from './faq-example.component';

describe('FaqExampleComponent', () => {
  let component: FaqExampleComponent;
  let fixture: ComponentFixture<FaqExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
