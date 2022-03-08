import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from '../../auth/auth.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header.component';

xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, AuthModule, JwtModule.forRoot({ config: {} })],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
