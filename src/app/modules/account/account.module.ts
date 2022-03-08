import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileStatsComponent } from './components/my-profile-stats/my-profile-stats.component';
import { ProgressCardComponent } from './components/progress-card/progress-card.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  MyProfileComponent,
  MyProfileStatsComponent,
  ProgressCardComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    AccountRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class AccountModule {
}
