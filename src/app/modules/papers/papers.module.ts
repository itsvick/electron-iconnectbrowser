import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PapersRoutingModule } from './papers-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { SharedModule } from '@shared/shared.module';
import { QuestionListItemsComponent } from './question-list-items/question-list-items.component';

const STATIC_IMPORTS = [
  SharedModule,
  CommonModule,
];

const EXPORTED_DECLARATIONS = [
  QuestionListComponent,
  QuestionListItemsComponent
];

@NgModule({
  imports: [
      STATIC_IMPORTS,
      PapersRoutingModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class PapersModule { }
