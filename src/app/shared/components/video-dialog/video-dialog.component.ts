import { Component, OnInit, Inject } from '@angular/core';
import { VideoDialogData } from '@shared/models/video-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '@api/services/question.service';
import { Question, View } from '@models/entities';
import { AuthService } from '@api/services/auth.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent {
  hasPlayedJingle: boolean;
  isOfflineViewRecorded: boolean;


  constructor(public dialogRef: MatDialogRef<VideoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: VideoDialogData, private questionService: QuestionService, private authService: AuthService) { }

  jingleUrl = 'assets/video/Paper_R_v6_smaller.mp4'



  onNoClick(): void {
    this.dialogRef.close();
  }

  videoEnd(event) {
    if (this.hasPlayedJingle) {
      this.onNoClick();
    } else {
      this.hasPlayedJingle = true;
      event.srcElement.src = this.data.videoPath;
      event.srcElement.load();    
    }
  }

  setVideoWatched() {
    if(this.hasPlayedJingle && !this.isOfflineViewRecorded) {
      this.uploadVideoView(this.data.videoCode);
    }
  }

  async uploadVideoView(videoCode: string) {
    this.isOfflineViewRecorded = true;

    let newView: View = {isOffline: true, viewCount: 1, itemCode: videoCode};

    if(!this.authService.isTokenExpired) {
        this.questionService.getByCode(videoCode).subscribe(question => {
        if (question.id) {
          if (this.authService.isOnline) {
            this.questionService.addVideoViews(newView, question).subscribe(result => {
              if(!result.id) {
                this.cacheVideoView(newView);
              } 
            })
          } else {
            this.cacheVideoView(newView);
          }
        }
      });
    } else {
      this.cacheVideoView(newView);  
    }
  }

  cacheVideoView(newView: View) {
    let offlineViews: [View] = JSON.parse(localStorage.getItem("offline-views")) ?? [];

    let index = offlineViews.findIndex(view => {
      return view.itemCode === newView.itemCode;
    });

    if(index === -1) {
      offlineViews.push(newView);
    } else {
      offlineViews[index].viewCount += newView.viewCount ?? 1; 
    }

    localStorage.setItem('offline-views', JSON.stringify(offlineViews));
  }
}
