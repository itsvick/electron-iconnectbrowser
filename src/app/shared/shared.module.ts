import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-elements/material.module';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    PdfViewerModule
  ],
  exports: [
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    PdfViewerModule
  ],
  entryComponents: [
    // Dialogs here
  ]
})
export class SharedModule {
  // tslint:disable-next-line: typedef
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
