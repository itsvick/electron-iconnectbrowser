import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserViewComponent } from './browser-view/browser-view.component';
import { SharedModule } from '@shared/shared.module';
import { BrowserRoutingModule } from './browser-routing.module';


const STATIC_IMPORTS = [SharedModule, CommonModule];

const EXPORTED_DECLARATIONS = [BrowserViewComponent];

@NgModule({
  imports: [STATIC_IMPORTS, BrowserRoutingModule],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class BrowserModule { }
