import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { Lesson } from '@models/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '@api/services/lesson.service';
import { UserService } from '@api/services/user.service';
import { forkJoin, BehaviorSubject, Subject } from 'rxjs';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { SubjectsService } from '@api/services/subjects.service';
import { ResourceUrl } from '@api/models/resource.model';
import { VideoViewerComponent } from '@shared/components/video-viewer/video-viewer.component';
import { hmsToSecondsOnly } from '@shared/helpers/formatter';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss'],
})
export class LessonViewComponent extends AbstractBaseComponent implements OnInit {
  lessonId: number;
  subjectId: number;
  lesson: Lesson;
  completed: boolean;

  jingleUrl: ResourceUrl;
  videoUrl: ResourceUrl;
  theme = 'lesson'

  hasPlayedJingle = false;

  _failedToLoadPdf: boolean;
  set failedToLoadPdf(v: boolean) {
    this._failedToLoadPdf = v;
    this.loadingPdf = !v;
  }
  get failedToLoadPdf(): boolean {
    return this._failedToLoadPdf;
  }

  loadingPdf: boolean;

  pdfUrl: any;

  videoPlayer: any;

  get hasPdf(): boolean {
    return this.pdfUrl && this.pdfUrl !== '' && !this.failedToLoadPdf;
  }

  get canDownloadPdf() {
    return this.hasPdf && !this.loadingPdf;
  }

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private userService: UserService,
    private subjectService: SubjectsService,
    public location: Location,
    private router: Router
  ) {
    super();
    this.lessonId = +this.route.snapshot.paramMap.get('lessonId');
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadingPdf = true;

    const actions = [];
    actions.push(this.lessonService.getById(this.lessonId));
    actions.push(this.userService.getLessonStatus(+this.lessonId));

    forkJoin(actions).subscribe(
      ([lesson, userLesson]: any) => {
        this.lesson = lesson;
        this.subjectId = lesson.subjectId;
        this.completed = userLesson.completed;

        const videoActions = [];
        videoActions.push(this.subjectService.getVideo(this.subjectId));
        videoActions.push(this.lessonService.getVideo(this.lessonId));
        videoActions.push(this.lessonService.getPdf(this.lessonId));

        forkJoin(videoActions).subscribe(
          ([jingle, video, pdf]) => {
            this.jingleUrl = jingle as any;
            this.videoUrl = video as any;
            this.pdfUrl = (pdf as any).url;

            this.showContent = true;
          },
          (error) => {
            console.log(error);
            this.router.navigate(['/dashboard']);
          },
        );
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/dashboard']);
      },
    );
  }

  back() {
    this.location.back();
  }

  getCompletionTime(): string {
    if (this.lesson && this.lesson.completionTime) {
      return (this.lesson.completionTime / 60).toFixed(1) + ' Hours';
    } else {
      return 'Completion time not specified';
    }
  }

  downloadPdf() {
    console.log({url: this.pdfUrl, name: this.lesson.pdf.name});
    saveAs(this.pdfUrl, `${this.lesson.pdf.name}.pdf`);
  }

  videoEnd(event) {
    if (!this.hasPlayedJingle) {
      this.hasPlayedJingle = true;
      event.srcElement.src = this.videoUrl.url;
      event.srcElement.load();
    } else {
      this.setStatus(true);
    }
  }

  getVideoElement(e) {
    this.videoPlayer = e;
  }

  setStatus(checked: boolean) {
    this.completed = checked;
    this.userService.updateLesson(this.lessonId, this.completed).subscribe();
  }

  seek(time: number) {
    const seconds = hmsToSecondsOnly(time);
    this.videoPlayer.nativeElement.currentTime = seconds;
  }
}
