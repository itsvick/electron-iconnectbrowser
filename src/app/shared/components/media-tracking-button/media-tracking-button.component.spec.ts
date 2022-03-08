import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTrackingButtonComponent } from './media-tracking-button.component';

describe('MediaTrackingButtonComponent', () => {
  let component: MediaTrackingButtonComponent;
  let fixture: ComponentFixture<MediaTrackingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTrackingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTrackingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
