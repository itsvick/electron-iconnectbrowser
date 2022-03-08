import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from '../../api/services/auth.service';
import { OrganizationService } from '../../api/services/organization.service';
import { AuthModule } from '../../auth/auth.module';
import { CoreModule } from '../../core/core.module';
import { NavigationService } from '../../core/navigation/navigation.service';
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { InformationHeaderComponent } from '../information-header/information-header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LayoutFullComponent } from './layout-full.component';

xdescribe('LayoutFullComponent', () => {
  let component: LayoutFullComponent;
  let fixture: ComponentFixture<LayoutFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, BrowserAnimationsModule, AuthModule, JwtModule.forRoot({ config: {} })],
      declarations: [LayoutFullComponent, HeaderComponent, SidenavComponent, InformationHeaderComponent, FooterComponent],
      providers: [NavigationService, AuthService, OrganizationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
