import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { MyProfileStatsComponent } from './components/my-profile-stats/my-profile-stats.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  MyProfileStatsComponent,
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
