import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { OfflineDialogComponent } from './offline-dialog/offline-dialog.component';
import { OfflineModeDialogComponent } from './offline-mode-dialog/offline-mode-dialog.component';


const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  OfflineDialogComponent,
  OfflineModeDialogComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  entryComponents: EXPORTED_DECLARATIONS
})
export class DialogsModule {
}
