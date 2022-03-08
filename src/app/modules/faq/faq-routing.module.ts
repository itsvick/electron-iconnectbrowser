import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqExampleComponent } from './faq-example/faq-example.component';

const routes: Routes = [
    {
        path: '',
        component: FaqExampleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaqRoutingModule { }
