import { Injectable } from '@angular/core';
import { Grade, Lesson, Paper, Subject, UserLesson, UserPaper } from '@models/entities';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  public $currentGrade: BehaviorSubject<Grade> = new BehaviorSubject<Grade>(null);
  public $currentSubject: BehaviorSubject<Subject> = new BehaviorSubject<Subject>(null);
  public $myPapers: BehaviorSubject<UserPaper[]> = new BehaviorSubject<UserPaper[]>(null);
  public $myLessons: BehaviorSubject<UserLesson[]> = new BehaviorSubject<UserLesson[]>(null);

  constructor() { }
}
