import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'view/:paperId/:questionCode',
    component: ViewComponent
  },
  {
    path: 'view/:paperId/:questionCode/:pageReachedViaSearch',
    component: ViewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
