import { NgModule } from '@angular/core';
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
})
export class BrowserModule { }
