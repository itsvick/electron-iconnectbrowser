import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { KeywordService } from '@api/services/keyword.service';
import { QuestionItemModel } from '@app/modules/papers/question-list-items/question-item.model';

import { Filter } from '@shared/models/filter';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionSearchService implements OnDestroy {

  static QUESTION_SEARCH_IDS_STORAGE_KEY = 'question_search_ids';
  static ORDERED_QUESTION_SEARCH_IDS_STORAGE_KEY = 'ordered_question_search_ids';

  // tslint:disable-next-line:variable-name
  private readonly _questionIds$: BehaviorSubject<any[]>;
  // tslint:disable-next-line:variable-name
  private readonly _orderedQuestionIds$: BehaviorSubject<QuestionItemModel[]>;
  // orderedQuestions$: BehaviorSubject<QuestionItemModel[]> = new BehaviorSubject<QuestionItemModel[]>(null);

  get orderedQuestions$(): Observable<any[]> {
    return this._orderedQuestionIds$;
  }
  set orderedQuestions(value: any[]) {
    sessionStorage.setItem(QuestionSearchService.ORDERED_QUESTION_SEARCH_IDS_STORAGE_KEY, JSON.stringify(value));
    this._orderedQuestionIds$.next(value);
  }

  get questionIds$(): Observable<number[]> {
    return this._questionIds$;
  }
  set questionIds(value: number[]) {
    sessionStorage.setItem(QuestionSearchService.QUESTION_SEARCH_IDS_STORAGE_KEY, JSON.stringify(value));
    this._questionIds$.next(value);
  }

  constructor() {
    const questionIds = JSON.parse(sessionStorage.getItem(QuestionSearchService.QUESTION_SEARCH_IDS_STORAGE_KEY));
    const orderedQuestionIds = JSON.parse(sessionStorage.getItem(QuestionSearchService.ORDERED_QUESTION_SEARCH_IDS_STORAGE_KEY));
    this._questionIds$ = new BehaviorSubject<number[]>(questionIds ? questionIds : null);
    this._orderedQuestionIds$ = new BehaviorSubject<any[]>(orderedQuestionIds ? orderedQuestionIds : null);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem(QuestionSearchService.QUESTION_SEARCH_IDS_STORAGE_KEY);
    sessionStorage.removeItem(QuestionSearchService.ORDERED_QUESTION_SEARCH_IDS_STORAGE_KEY);

    this._questionIds$.unsubscribe();
    this._orderedQuestionIds$.unsubscribe();
  }
}