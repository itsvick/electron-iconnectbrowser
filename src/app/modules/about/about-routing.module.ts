import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutExampleComponent } from './about-example/about-example.component';

const routes: Routes = [
    {
        path: '',
        component: AboutExampleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }
