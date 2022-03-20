import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from '../material-elements/material.module';
import { LoaderButtonComponent } from './loader-button/loader-button.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { CenteredContentLayoutComponent } from './centered-content-layout/centered-content-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { InputStyledComponent } from './input-styled/input-styled.component';
import { InputStyledDropdownComponent } from './input-styled-dropdown/input-styled-dropdown.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MediaTrackingButtonComponent } from './media-tracking-button/media-tracking-button.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';


const EXPORTED_DECLARATIONS = [
  LoaderButtonComponent,
  FilterSelectComponent,
  CenteredContentLayoutComponent,
  MainLayoutComponent,
  LoaderButtonComponent,
  InputStyledComponent,
  InputStyledDropdownComponent,
  ImageDialogComponent,
  MediaTrackingButtonComponent,
  MathjaxComponent,
  ConfirmationDialogComponent,
  CustomDropdownComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
  ],
  entryComponents: [ImageDialogComponent],
  exports: [EXPORTED_DECLARATIONS],
  declarations: EXPORTED_DECLARATIONS,
})
export class ComponentsModule { }
