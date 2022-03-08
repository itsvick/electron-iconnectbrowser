
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StaticLayoutComponent } from './static-layout/static-layout.component';
import { StaticHeaderComponent } from './static-header/static-header.component';

import { SidePanelLayoutComponent } from './side-panel-layout/side-panel-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { StandardLayoutComponent } from '@shared/components/standard-layout/standard-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutFullComponent } from './layout-full/layout-full.component';
import { ProfileSettingsComponent } from './components/header/profile-settings/profile-settings.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  StaticLayoutComponent,
  FooterComponent,
  HeaderComponent,
  SidenavComponent,
  StaticHeaderComponent,
  SidePanelLayoutComponent,
  AuthLayoutComponent,
  StandardLayoutComponent,
  AuthLayoutComponent,
  LayoutFullComponent,
  ProfileSettingsComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  entryComponents: [ProfileSettingsComponent]
})

export class LayoutModule { }
