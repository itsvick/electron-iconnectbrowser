import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { MySubjectsComponent } from './my-subjects/my-subjects.component';
import { SubjectComponent } from './subject/subject.component';
import { LessonVideoViewComponent } from './lesson-video-view/lesson-video-view.component';
import { SubjectViewComponent } from './subject-view/subject-view.component';
import { SubjectResourceCardComponent } from './components/subject-resource-card/subject-resource-card.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  MySubjectsComponent,
  SubjectComponent,
  LessonVideoViewComponent,
  SubjectViewComponent,
  SubjectResourceCardComponent
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    SubjectsRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  providers: [TitleCasePipe]
})
export class SubjectsModule {
}
