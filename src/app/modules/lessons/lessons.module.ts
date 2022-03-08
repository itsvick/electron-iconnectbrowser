import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { SharedModule } from '@shared/shared.module';

const STATIC_IMPORTS = [SharedModule, CommonModule];

const EXPORTED_DECLARATIONS = [LessonViewComponent];

@NgModule({
  imports: [STATIC_IMPORTS, LessonsRoutingModule],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
})
export class LessonsModule {}
