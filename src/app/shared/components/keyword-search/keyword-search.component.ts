import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Question } from '@models/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '@api/services/question.service';
import { KeywordService, SearchKeyword } from '@api/services/keyword.service';
import { QuestionSearchService } from '@app/services/question-search.service';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.scss'],
})
export class KeywordSearchComponent implements OnInit {
  @Input() paperIds: number[];

  @ViewChild('chips', { read: ElementRef, static: false }) targetElement: ElementRef;

  @Output() searchPhraseChanged = new EventEmitter<string>();
  @Output() valueSelected = new EventEmitter<any>();
  @Output() clear = new EventEmitter();

  keywords: BehaviorSubject<SearchKeyword[]> = new BehaviorSubject<SearchKeyword[]>(null);
  difficulties: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
  questions: Question[];

  open = false;
  placeholder = 'Search';
  searchControl = new FormControl();
  isLoading = false;
  noData: boolean;
  /**
   * When true, all questions must contain the keywords.
   * When false, the question can contain the keyword (And/Or filter)
   */
  containAll = false;

  // lastSelectedQuestion: Question = null;
  selectedQuestions: Question[] = [];
  selectedKeywords: SearchKeyword[] = [];
  selectedDiffs: number[] = [];
  resultsMarginTop: string;
  includeCompleted = false;
  applying: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private keywordService: KeywordService,
    private questionSearchService: QuestionSearchService,
  ) {
  }

  isSelected(item: SearchKeyword): boolean {
    return this.selectedKeywords.some((s) => s.id === item.id);
  }

  diffIsSelected(diff: number): boolean {
    return this.selectedDiffs.some((sd) => sd === diff);
  }

  calcMarginTop() {
    // The setTimeout function schedules a macrotask then will be executed in the following VM turn.
    setTimeout(() => {
      const chipsHeight = this.targetElement ? this.targetElement.nativeElement.offsetHeight : null;
      this.resultsMarginTop = 45 + (chipsHeight ? chipsHeight + 16 : 0) + 'px';
    }, 0);
  }

  ngOnInit() {
    this.keywordService.getAllByPaperIds(this.paperIds).subscribe((results) => {
      console.log({ids: this.paperIds, res: results})
      this.keywords.next(results.keywords);
      this.difficulties.next(results.difficulties);
      this.questions = results.questions;
      this.calcMarginTop();
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.open = true;
      this.keywords.next(null);
      this.isLoading = true;
      this.noData = false;
    });

    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((text: string) => {
      this.searchPhraseChanged.emit(text === '' ? null : text);
      this.searchForKeywords(text === '' ? null : text);
      if (text === '') {
        this.clear.emit();
      }
    });

    this.keywords.subscribe((newValue) => {
      this.isLoading = false;
      this.noData = !newValue || newValue.length === 0;
    });
  }

  searchForKeywords(phrase?: string) {
    this.keywordService.getAllByPaperIds(this.paperIds, phrase).subscribe((results) => {
      this.keywords.next(results.keywords);
      this.difficulties.next(results.difficulties);
      this.questions = results.questions;
      this.calcMarginTop();
    });
  }

  itemSelected(event: SearchKeyword, select) {
    this.calcMarginTop();
    if (select) {
      this.selectedKeywords.push(event);
      this.selectedQuestions.push(...this.questions.filter(q => q.keywords.some(kw => kw.id === event.id)));
    } else {
      this.remove(event);
    }
    this.searchControl.setValue(event.name, { emitEvent: false });
  }

  remove(item: SearchKeyword) {
    this.calcMarginTop();
    this.selectedKeywords.splice(_.findIndex(this.selectedKeywords, (kw => kw.id === item.id)), 1);
    this.selectedQuestions = this.selectedQuestions.reduce((reducer: Question[], question: Question) => {
      if (!question.keywords.some(kw => kw.id === item.id)) {
        reducer.push(question);
      }
      return reducer;
    }, []);
  }

  clearSearch() {
    this.searchControl.setValue(null, { emitEvent: false });
    this.open = false;
    this.selectedDiffs = [];
    this.clear.emit();
  }

  clearKeywords() {
    this.calcMarginTop();
    this.selectedKeywords = [];
    this.clearSearch();
  }

  diffSelected(event: number, select: boolean) {
    if (select) {
      this.selectedDiffs.push(event);
    } else {
      this.selectedDiffs.splice(this.selectedDiffs.indexOf(event), 1);
    }
  }

  applySearchFilters() {
    this.applying = true;
    try {
      const keywordUrlPart = JSON.stringify(this.selectedKeywords);
      const difficultyUrlPart = JSON.stringify(this.selectedDiffs);
      const includeUrlPart = JSON.stringify(this.includeCompleted);

      this.questionSearchService.questionIds = this.getAdvancedSearchQuestions();

      this.router.navigate(['papers/questions', keywordUrlPart, difficultyUrlPart, includeUrlPart]);
    } catch (ex) {
      this.applying = false;
    }
  }

  getAdvancedSearchQuestions(): number[] {
    const result = [];

    if (this.selectedQuestions && this.selectedQuestions.length > 0) {
      let questions = this.selectedQuestions;
      if (questions && questions.length > 0) {
        if (this.selectedDiffs && this.selectedDiffs.length > 0) {
          questions = this.questions.filter((q) => this.selectedDiffs.includes(q.difficulty));
        }

        if (this.containAll) {
          const dupQuestions = _.countBy(questions, 'id');
          const dupIds = new Set<number>();
          _.forIn(dupQuestions, (value, key) => {
            if (value === this.selectedKeywords.length) {
              dupIds.add(+key);
            }
          });
          for (const id of dupIds) {
            const question = questions.find(q => q.id === id);
            if (question != null) {
              result.push(question);
            }
          }
        } else {
          questions = _.uniqBy(questions, 'id');
          result.push(...questions);
        }
      }
    }

    return result.map((q) => +q.id);
  }
}


