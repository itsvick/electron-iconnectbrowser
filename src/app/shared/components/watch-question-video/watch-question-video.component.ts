import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceUrl } from '@api/models/resource.model';
import { Question } from '@models/entities';
import { QuestionService } from '@api/services/question.service';
import { Router } from '@angular/router';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-watch-question-video',
  templateUrl: './watch-question-video.component.html',
  styleUrls: ['./watch-question-video.component.scss'],
})
export class WatchQuestionVideoComponent extends AbstractBaseComponent implements OnInit {
  @Input() $question = new BehaviorSubject<Question>(null);
  @Input() $parentQuestion = new BehaviorSubject<Question>(null);
  @Input() $videoUrl = new BehaviorSubject<ResourceUrl>(null);
  @Input() $jingleUrl = new BehaviorSubject<ResourceUrl>(null);
  @Input() $memoUrl = new BehaviorSubject<ResourceUrl>(null);
  @Input() autoplay = true;
  @Input() videoNumber: number;
  @Input() prevDisabled: boolean;
  @Input() nextDisabled: boolean;
  @Output() nextQuestion = new EventEmitter();
  @Output() previousQuestion = new EventEmitter();
  @Output() videoEnded: EventEmitter<number> = new EventEmitter();

  question: Question;
  parentQuestion: Question;
  videoUrl: ResourceUrl;
  jingleUrl: ResourceUrl;
  memoUrl: ResourceUrl;

  hasPlayedJingle = false;
  imageLoaded = false;

  get hasMemo(): boolean {
    return this.memoUrl && this.memoUrl.url && this.memoUrl.url !== '';
  }

  hasImage(question: Question): boolean {
    return this.imageLoaded && question && question.questionImage && question.questionImage !== '';
  }

  constructor(
    private questionService: QuestionService,
    public dialog: MatDialog,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.$question.subscribe((val) => {
      this.isLoading = true;
      this.question = val;
      if (this.question.questionImage) {
        this.questionService.getImage(this.question.id).subscribe(value => {
          this.imageLoaded = true;
          this.question.questionImage = value.url;
        });
      }
      setTimeout(() => {
        this.showContent = true;
      });
    });
    this.$parentQuestion.subscribe(val => {
      this.parentQuestion = val;
      if (this.parentQuestion.questionImage) {
        this.questionService.getImage(this.parentQuestion.id).subscribe(value => {
          this.imageLoaded = true;
          this.parentQuestion.questionImage = value.url;
        });
      }
    });
    this.$videoUrl.subscribe((val) => (this.videoUrl = val));
    this.$jingleUrl.subscribe((val) => {
      this.jingleUrl = val;
      if (this.jingleUrl) {
        this.hasPlayedJingle = this.jingleUrl.url === null;
      }
    });
    this.$memoUrl.subscribe((val) => (this.memoUrl = val));
  }

  close() {
    this.router.navigate([`papers/${this.question.paperId}/questions`]);
  }

  setStatus(completed: boolean) {
    this.question.isCompleted = completed;
    this.questionService.updateCompleteStatus(this.question.id, completed, 1).subscribe();
    if (completed) {
      this.hasPlayedJingle = false;
      this.videoEnded.emit(this.videoNumber);
    }
  }

  videoEnd(event) {
    // Prevent the video from repeatedly playing after it first loads
    if (!this.hasPlayedJingle) {
      this.hasPlayedJingle = true;
      event.srcElement.src = this.videoUrl.url;
      event.srcElement.load();
    } else {
      this.setStatus(true);
    }
  }

  showMemo() {
    if (this.hasMemo) {
      this.dialog.open(ImageDialogComponent, {
        data: { imagePath: this.memoUrl.url },
      });

      this.questionService.addMemoViews(this.question.id, 1).subscribe();
    }
  }
}
