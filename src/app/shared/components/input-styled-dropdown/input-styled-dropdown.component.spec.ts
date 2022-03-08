import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStyledDropdownComponent } from './input-styled-dropdown.component';

describe('InputStyledDropdownComponent', () => {
  let component: InputStyledDropdownComponent;
  let fixture: ComponentFixture<InputStyledDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStyledDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStyledDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
