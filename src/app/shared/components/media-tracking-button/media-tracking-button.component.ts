import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-media-tracking-button',
  templateUrl: './media-tracking-button.component.html',
  styleUrls: ['./media-tracking-button.component.scss']
})
export class MediaTrackingButtonComponent implements OnInit {

  @Input() disabled = false;
  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.action.emit();
  }

}
