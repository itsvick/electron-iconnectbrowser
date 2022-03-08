import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileStatsComponent } from './my-profile-stats.component';

describe('MyProfileStatsComponent', () => {
  let component: MyProfileStatsComponent;
  let fixture: ComponentFixture<MyProfileStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
