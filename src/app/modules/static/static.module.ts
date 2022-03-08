import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { StaticRoutingModule } from './static-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule,
];

const EXPORTED_DECLARATIONS = [
  LandingPageComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    StaticRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class StaticModule { }
