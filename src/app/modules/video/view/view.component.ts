import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '@api/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, UserQuestion } from '@models/entities';
import { ResourceUrl } from '@api/models/resource.model';

import { forkJoin, BehaviorSubject, Subject } from 'rxjs';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { SubjectsService } from '@api/services/subjects.service';
import { PaperService } from '@api/services/paper.service';
import { Location } from '@angular/common';
import { keyBy, Dictionary } from 'lodash';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent extends AbstractBaseComponent implements OnInit {
  $question = new BehaviorSubject<Question>(null);
  $parentQuestion = new BehaviorSubject<Question>(null);
  $videoUrl = new BehaviorSubject<ResourceUrl>(null);
  $jingleUrl = new BehaviorSubject<ResourceUrl>(null);
  $memoUrl = new BehaviorSubject<ResourceUrl>(null);

  private _parentQuestion: Question;
  private _currentQuestion: Question;

  public paperId: string;
  private questionCode: string;
  private paperQuestions: Array<Question>;
  private userQuestions: Dictionary<UserQuestion>;

  videoNum: number;

  get parentQuestion(): Question {
    return this._parentQuestion;
  }

  set parentQuestion(value: Question) {
    this.$parentQuestion.next(value);
    this._parentQuestion = value;
  }

  get currentQuestion(): Question {
    return this._currentQuestion;
  }

  set currentQuestion(value: Question) {
    this.$question.next(value);
    this._currentQuestion = value;
  }

  get hasNextQuestion() {
    return this.questionIndex + 1 < this.paperQuestions.length;
  }

  get hasPrevQuestion() {
    return this.questionIndex - 1 > 0;
  }

  get questionIndex() {
    return this.paperQuestions.findIndex((question) => {
      return question.questionCode === this.questionCode;
    });
  }

  constructor(
    private questionService: QuestionService,
    private paperService: PaperService,
    private subjectService: SubjectsService,
    public location: Location,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super();
    this.paperId = this.route.snapshot.paramMap.get('paperId');
    this.questionCode = this.route.snapshot.paramMap.get('questionCode');
    this.videoNum = +this.route.snapshot.queryParams['video-number'] || 1;
  }



  ngOnInit() {
    this.getPaperQuestions();
  }

  getPaperQuestions() {
    this.questionService.getByPaperId(this.paperId).subscribe(({ questions, userQuestions }) => {
      this.paperQuestions = questions;
      for (const question of this.paperQuestions) {
        const children = this.paperQuestions.filter((q) => question.id === q.parentQuestionId);
        question.isParent = children.length !== 0;
      }
      this.userQuestions = keyBy(userQuestions, 'questionId');
      this.getPaper();
    });
  }

  getPaper() {
    this.paperService.getById(+this.paperId).subscribe((paper) => {
      this.paperQuestions.map((question) => {
        question.paper = paper;
        question.isCompleted = this.isCompleted(question);
        return question;
      });
      this.goToQuestion(this.questionIndex);
    });
  }

  // Will fetch all resources needed for a question
  getResourcesForQuestion(question: Question) {
    const actions = [];
    actions.push(this.questionService.getVideo(question.id, this.videoNum));
    actions.push(this.subjectService.getVideo(question.subjectId));
    actions.push(this.questionService.getMemo(question.id));

    forkJoin(actions).subscribe(([videoUrl, jingleUrl, memoUrl]) => {
      this.$videoUrl.next(videoUrl as any);
      this.$jingleUrl.next(jingleUrl as any);
      this.$memoUrl.next(memoUrl as any);
      this.updateRoute();
      this.showContent = true;
    });
  }

  getParentQuestion(question: Question) {
    return this.paperQuestions.find(q => q.id === question.parentQuestionId);
  }

  nextVideo(videoNumber: number) {
    if (videoNumber < this.currentQuestion.videoCount) {
      this.videoNum++;
      this.getResourcesForQuestion(this.currentQuestion);
    } else {
      this.nextQuestion();
    }
  }

  goToQuestion(index: number) {
    if (index > this.paperQuestions.length - 1) {
      return;
    }
    this.isLoading = true;
    let question = this.paperQuestions[index];
    if (index < this.questionIndex) {
      let i = index - 1;
      while (question.isParent) {
        question = this.paperQuestions[i--];
      }
    }
    if (question.isParent) {
      this.questionCode = question.questionCode;
      return this.nextQuestion();
    }
    this.videoNum = 1;
    this.getResourcesForQuestion(question);
    this.questionCode = question.questionCode;
    this.parentQuestion = this.getParentQuestion(question);
    this.currentQuestion = question;
    this.showContent = true;
  }

  nextQuestion() {
    this.goToQuestion(this.questionIndex + 1);
  }

  previousQuestion() {
    this.goToQuestion(this.questionIndex - 1);
  }

  updateRoute() {
    const parts = this.router.url.split('/');
    const updatedRoute = parts.slice(0, -1).concat(this.questionCode);
    this.location.go(updatedRoute.join('/'));
  }

  isCompleted(question: Question) {
    const userQuestion = this.userQuestions[question.id];
    return userQuestion ? userQuestion.memoModeCompleted : false;
  }
}
