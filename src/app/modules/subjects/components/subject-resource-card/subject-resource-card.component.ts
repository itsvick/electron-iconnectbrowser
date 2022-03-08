import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubjectResource } from '../../../../shared/models/subject-resource';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subject-resource-card',
  templateUrl: './subject-resource-card.component.html',
  styleUrls: ['./subject-resource-card.component.scss']
})
export class SubjectResourceCardComponent implements OnInit {
  @Input() subjectResource: SubjectResource;
  @Output() changed = new EventEmitter<SubjectResource>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get isLesson() {
    return this.subjectResource.type === 'lesson'
  }

  get isPaper() {
    return this.subjectResource.type === 'paper'
  }

  openResource() {
    console.log('hits');
    if (!this.subjectResource.locked) {
      if (this.subjectResource.type === 'paper'){
        this.router.navigate([`papers/${this.subjectResource.id}/questions`]);
      } else if (this.subjectResource.type === 'lesson') {
        this.router.navigate([`lessons/${this.subjectResource.id}/view`]);
      }
    }
  }

  completedChanged(event) {
    this.subjectResource.completed = event.checked;
    this.changed.emit(this.subjectResource);
  }
}
