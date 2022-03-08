import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExampleComponent } from './about-example.component';

describe('AboutExampleComponent', () => {
  let component: AboutExampleComponent;
  let fixture: ComponentFixture<AboutExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
