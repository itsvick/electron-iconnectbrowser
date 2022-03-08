import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonViewComponent } from './lesson-view/lesson-view.component';

const routes: Routes = [
  {
    path: ':lessonId/view',
    component: LessonViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsRoutingModule {}
