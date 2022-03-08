import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from '../../api/services/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { SharedModule } from '../../shared/shared.module';
import { SidenavComponent } from './sidenav.component';

xdescribe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, AuthModule, JwtModule.forRoot({ config: {} })],
      declarations: [SidenavComponent],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
