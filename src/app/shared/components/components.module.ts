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
import { VideoLayoutComponent } from './video-layout/video-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { InputStyledComponent } from './input-styled/input-styled.component';
import { InputStyledDropdownComponent } from './input-styled-dropdown/input-styled-dropdown.component';
import { WatchQuestionVideoComponent } from './watch-question-video/watch-question-video.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { MediaTrackingButtonComponent } from './media-tracking-button/media-tracking-button.component';
import { PreRequisitesComponent } from './pre-requsites/pre-requisites.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { ParentQuestionAccordionComponent } from './parent-question-accordion/parent-question-accordion.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { VideoDialogComponent } from '@shared/components/video-dialog/video-dialog.component';

const EXPORTED_DECLARATIONS = [
  LoaderButtonComponent,
  FilterSelectComponent,
  CenteredContentLayoutComponent,
  VideoLayoutComponent,
  MainLayoutComponent,
  LoaderButtonComponent,
  InputStyledComponent,
  InputStyledDropdownComponent,
  WatchQuestionVideoComponent,
  ImageDialogComponent,
  VideoViewerComponent,
  MediaTrackingButtonComponent,
  PreRequisitesComponent,
  VideoViewComponent,
  ParentQuestionAccordionComponent,
  MathjaxComponent,
  KeywordSearchComponent,
  ConfirmationDialogComponent,
  CustomDropdownComponent,
  VideoDialogComponent
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
  entryComponents: [ImageDialogComponent, VideoDialogComponent],
  exports: [EXPORTED_DECLARATIONS],
  declarations: EXPORTED_DECLARATIONS,
})
export class ComponentsModule { }
