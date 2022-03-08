import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-layout',
  templateUrl: './video-layout.component.html',
  styleUrls: ['./video-layout.component.scss']
})
export class VideoLayoutComponent implements OnInit {
  @Input() theme: string;

  constructor() { }

  ngOnInit() {
  }

}
