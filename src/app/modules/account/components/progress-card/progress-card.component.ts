import { Component, OnInit, Input } from '@angular/core';
import { ProgressCard } from '@shared/models/resource-card';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {
  @Input() progress: ProgressCard;
  @Input() state = new BehaviorSubject(null);
  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.state.subscribe(stateValue => {
      this.isLoading = stateValue;
    });
  }

}
