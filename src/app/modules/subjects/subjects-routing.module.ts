import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySubjectsComponent } from './my-subjects/my-subjects.component';
import { SubjectViewComponent } from './subject-view/subject-view.component';

const routes: Routes = [
    {
        path: '',
        component: MySubjectsComponent
    },
    {
        path: ':subjectId',
        children: [{
            path: '',
            component: SubjectViewComponent,
        }, {
            path: 'lessons',
            component: SubjectViewComponent,
        }, {
            path: 'papers',
            component: SubjectViewComponent,
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubjectsRoutingModule { }
