import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceViewComponent } from './resource-view/resource-view.component';

const routes: Routes = [
    {
        path: '',
        component: ResourceViewComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule { }
