import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceViewComponent } from './resource-view/resource-view.component';


const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  ResourceViewComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    ResourcesRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class ResourcesModule {
}
