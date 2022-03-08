import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    path: ':paperId/questions',
    component: QuestionListComponent
  },
  {
    path: 'questions/:keywords/:diff/:incl',
    component: QuestionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PapersRoutingModule { }
