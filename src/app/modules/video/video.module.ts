import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '@shared/shared.module';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];


const EXPORTED_DECLARATIONS = [
  ViewComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    VideoRoutingModule
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
})
export class VideoModule { }
