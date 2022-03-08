import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqExampleComponent } from './faq-example/faq-example.component';


const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  FaqExampleComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    FaqRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class FaqModule {
}
