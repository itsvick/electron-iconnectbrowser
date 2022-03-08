import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserViewComponent } from './browser-view/browser-view.component';


const routes: Routes = [
  {
    path: '',
    component: BrowserViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowserRoutingModule {}
