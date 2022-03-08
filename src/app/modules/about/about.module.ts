import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutExampleComponent } from './about-example/about-example.component';


const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  AboutExampleComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    AboutRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class AboutModule {
}
