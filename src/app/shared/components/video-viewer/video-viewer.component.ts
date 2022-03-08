import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.scss'],
})
export class VideoViewerComponent implements AfterViewInit, OnInit {
  @Input() autoplay = false;
  @Input() videoUrl: string;
  @Output() videoEnd = new EventEmitter();
  @Output() videoController = new EventEmitter();
  @Output() setVideoWatched = new EventEmitter();
 
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.videoController.emit(this.videoPlayer);
  }

  setVideoTime(event) {
      if (event.target.currentTime >= (event.target.duration / 2)) {
        this.setVideoWatched.emit();
      } 
  }

  onVideoEnded(event) {
    this.videoEnd.emit(event);
  }
}
