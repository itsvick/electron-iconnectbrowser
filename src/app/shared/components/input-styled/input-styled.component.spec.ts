import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStyledComponent } from './input-styled.component';

describe('InputStyledComponent', () => {
  let component: InputStyledComponent;
  let fixture: ComponentFixture<InputStyledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStyledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStyledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
