import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question, Paper } from '@models/entities';
import { QuestionService } from '@api/services/question.service';
import { ImageDialogComponent } from '@shared/components/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  PaperListItem,
  QuestionItemModel
} from './question-item.model';
import { Observable } from 'rxjs';
import { QuestionSearchService } from '@app/services/question-search.service';

@Component({
  selector: 'app-question-list-items',
  templateUrl: './question-list-items.component.html',
  styleUrls: ['./question-list-items.component.scss'],
})
export class QuestionListItemsComponent implements OnInit {
  @Input() paperListItems: PaperListItem[];
  @Input() questionItems: QuestionItemModel[];
  @Input() isCompleted: (id: number) => boolean;
  @Input() isExamMode: boolean;

  @Input() reachedViaSearch: boolean;
  @Output() markAsComplete = new EventEmitter<{ checked: boolean; questionId: number }>();
  questionItemsByPaper: any[];

  hasImage(question: Question): boolean {
    return question.questionImage && question.questionImage !== '';
  }

  hasMemo(question: Question): boolean {
    return question.memo && question.memo !== '';
  }

  constructor(
    private questionService: QuestionService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
  }

  onMarkAsComplete(checked: boolean, questionId: number) {
    this.markAsComplete.emit({ checked, questionId });
  }

  showMemo(question: Question) {
    if (this.hasMemo(question)) {
      this.dialog.open(ImageDialogComponent, {
        data: { imagePath: question.memo },
      });
      this.questionService.addMemoViews(question.id, 1).subscribe();
    }
  }
}

