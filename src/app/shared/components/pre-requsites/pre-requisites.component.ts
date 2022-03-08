import { Component, OnInit, Input } from '@angular/core';
import { PreRequisite } from '@models/entities';
import * as _ from 'lodash';

@Component({
  selector: 'app-pre-requisites',
  templateUrl: './pre-requisites.component.html',
  styleUrls: ['./pre-requisites.component.scss'],
})
export class PreRequisitesComponent implements OnInit {
  @Input() theme: 'exam' | 'lesson' = 'exam';
  @Input() preRequisites: PreRequisite[];

  lessonLink(preRequisite: PreRequisite): string {
    return `/lessons/${preRequisite.lessonId}/view`;
  }

  constructor() {}

  ngOnInit() {
    // We only support lessons at the moment
    this.preRequisites = _.remove(this.preRequisites, (value => value.lessonId));
  }
}
