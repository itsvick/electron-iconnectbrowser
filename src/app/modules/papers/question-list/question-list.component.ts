import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '@api/services/question.service';
import { PaperService } from '@api/services/paper.service';
import { Question, Paper, UserQuestion, Language } from '@models/entities';
import { forkJoin, Observable, Subject, ReplaySubject, zip, from, of } from 'rxjs';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { saveAs } from 'file-saver';
import { UserService } from '@api/services/user.service';
import { ResourceUrl } from '@api/models/resource.model';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '@api/services/language.service';
import { PaginatedResult } from '@shared/models/pagination';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { mergeMap } from 'rxjs/operators';
import { subscribeTo } from 'rxjs/internal-compatibility';
import { QuestionSearchService } from '@app/services/question-search.service';
import { PaperListItem, QuestionItemModel } from '../question-list-items/question-item.model';
import { ImageDialogComponent } from '@shared/components/image-dialog/image-dialog.component';
import { sortQuestionItems } from '@shared/helpers/question-sortter';

export enum SubjectTypeEnum {
  Papers,
  Lessons
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent extends AbstractBaseComponent implements OnInit {
  paperId: string;

  questions: Question[];
  // paper: Paper;
  completedStatus: UserQuestion[];
  allCompleted: boolean;
  isMarking: boolean;
  isExamMode = false;
  // subjectId: any;
  urlKeywords: { id: number; name: string; count: number }[];
  urlDifficulties: number[];
  urlInclCompleted: boolean;
  urlQuestions: number[];

  _paper: Paper;
  _subjectId: number;
  _gradeId: number;

  isLoadingPaper: boolean;

  imagesLoaded = false;
  selectedIndex: number;

  questionItems: QuestionItemModel[];
  paperItems: PaperListItem[];

  get uniqueQuestionsCount(): number {
    return _.uniq(this.urlQuestions).length;
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private paperService: PaperService,
    private userService: UserService,
    public dialog: MatDialog,
    public location: Location,
    public router: Router,
    private questionSearchService: QuestionSearchService
  ) {
    super();
    this.urlQuestions = [];
    this.paperId = this.getParam('paperId');
    this.questionSearchService.questionIds$.subscribe(qIds => {
      this.urlQuestions = qIds;
    });;
    this.urlKeywords = this.getParam('keywords', true, true);
    this.urlDifficulties = this.getParam('diff', true, true);
    this.urlInclCompleted = this.getParam('incl', true);

    this.questionItems = [];
    this.paperItems = [];
  }

  getParam(name: string, parse = false, isArray = false): any {
    let param = null;
    if (parse) {
      param = this.route.snapshot.paramMap.get(name) ? JSON.parse(this.route.snapshot.paramMap.get(name)) : null;
    } else {
      param = this.route.snapshot.paramMap.get(name);
    }

    if (isArray) {
      if (param && param.length === 0) {
        param = null;
      }
    }
    return param;
  }

  get canDownloadPdf() {
    return this.paper && this.paper.pdf && this.paper.pdf.filePath && this.paper.pdf.filePath !== '';
  }

  hasMemo(question: Question): boolean {
    return question.memo && question.memo !== '';
  }

  hasImage(question: Question): boolean {
    return this.imagesLoaded && question.questionImage && question.questionImage !== '';
  }

  get pageReachedViaSearch(): boolean {
    return !this.paperId && (this.urlKeywords || this.urlDifficulties || this.urlInclCompleted) ? true : false;
  }

  get paper() {
    if (this.pageReachedViaSearch) {
      this._paper = null;
    }
    return this._paper;
  }

  set paper(v: Paper) {
    this._paper = v;
  }

  get subjectId() {
    const question = this.questions.find(q => !!q.subjectId);
    this._subjectId = question ? question.subjectId : null;
    return this._subjectId;
  }

  set subjectId(v: number) {
    this._subjectId = v;
  }

  get gradeId() {
    if (this.pageReachedViaSearch) {
      this._gradeId = this.questions.find(q => !!q.gradeId).gradeId;
    } else {
      this._gradeId = this.paper.gradeId;
    }
    return this._gradeId;
  }

  set gradeId(v: number) {
    this._gradeId = v;
  }

  private getQuestionCompleted(userQuestion: UserQuestion): boolean {
    return this.isExamMode ? userQuestion.examModeCompleted : userQuestion.memoModeCompleted;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isLoadingPaper = true;
    const actions = [];
    if (this.pageReachedViaSearch) {
      if (this.urlQuestions && this.urlQuestions.length > 0) {
        actions.push(this.questionService.getMultipleByIds(this.urlQuestions));
        forkJoin(actions).subscribe(([{ questions, userQuestions }]: any) => {
          const questionWithParents = _.flatten(questions.map((q: Question) => {
            return [q.parentQuestion, q];
          })).filter(f => f) as any[];
          this.buildSearchResultQuestionList(questionWithParents, userQuestions);
        });
      } else {
        this.questions = [];
        this.isLoadingPaper = false;
        this.showContent = true;
      }
    } else {
      actions.push(this.paperService.getById(+this.paperId));
      actions.push(this.questionService.getByPaperId(this.paperId));
      forkJoin(actions).subscribe(([paper, { questions, userQuestions }]: any) => {
        this.buildQuestionList(paper, questions, userQuestions);
      });
    }
  }

  private setQuestionListItems() {
    const removeDupQuestions = (acc: Question[], item: Question) => {
      if (!acc.some(q => q.id === item.id)) {
        acc.push(item);
      }
      return acc;
    };
    const topLevelParents = this.questions.filter(q => (q.isParent && q.parentQuestionId === null) || (!q.isParent && q.parentQuestionId === null))
      .reduce(removeDupQuestions, []);
    const subParents = this.questions.filter(q => q.isParent && q.parentQuestionId != null)
      .reduce(removeDupQuestions, []);
    const children = this.questions.filter(q => !q.isParent)
      .reduce(removeDupQuestions, []);
    const uniquePapers = _.uniqBy(this.questions, q => q.paperId);

    this.paperItems = uniquePapers.map<PaperListItem>(
      q => ({
        paper: {
          paperId: q.paperId,
          month: q.paper.month,
          paperNo: `${ q.paper.paperNo }`,
          year: q.paper.year
        },
        questions: new Array<QuestionItemModel>()
      })
    );

    this.questionItems.push(...topLevelParents.map<QuestionItemModel>(q => (
      {
        id: q.id,
        idCode: q.idCode,
        questionNumber: q.questionNumber,
        questionDescription: q.questionDescription,
        containsFormula: q.containsFormula,
        questionImage: q.questionImage,
        memo: q.memo,
        video1Id: q.video1Id,
        video2Id: q.video2Id,
        video3Id: q.video3Id,
        paperId: q.paperId,
        questionCode: q.questionCode,
        mark: q.mark,
        isCompleted: q.isCompleted,
        isParent: q.isParent,
        isPreReq: q.isPreRequisiteQuestion,
        subjectId: q.subjectId,
        children: [],
      })
    ));

    for (const subParent of subParents) {
      this.setQuestions(subParent, this.questionItems);
    }

    for (const child of children) {
      this.setQuestions(child, this.questionItems);
    }

    this.questionItems = this.sortQuestionItems(this.questionItems);

    for (const q of this.questionItems) {
      const index = this.paperItems.findIndex(p => p.paper.paperId === q.paperId);
      if (index >= 0) {
        this.paperItems[index].questions.push(q);
      }
    }
  }

  buildQuestionList(
    paper: Paper,
    questions: Question[],
    userQuestions: UserQuestion[],
  ) {
    if (questions) {
      this.questions = this.setParents(questions);
      this.paper = paper;
      this.subjectId = paper.subjectId;
      userQuestions.forEach(uq => {
        if (this.questions.find(q => q.id === uq.questionId)) {
          if (this.questions.find(q => q.id === uq.questionId).isParent) {
            uq.question = {
              isParent: true
            } as Question;
          } else {
            uq.question = {
              isParent: false
            } as Question;
          }
        } else {
          uq.question = {
            isParent: false
          } as Question;
        }
      });
      this.completedStatus = userQuestions;
      this.setQuestionListItems();
      this.isLoadingPaper = false;
      this.showContent = true;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  private setQuestions(subQuestion: Question, questions: QuestionItemModel[]) {
    const parentIndex = questions.findIndex(q => q.id === subQuestion.parentQuestionId);
    if (parentIndex >= 0) {
      if (!questions[parentIndex].children.some(q => q.id === subQuestion.id)) {
        questions[parentIndex].children.push(
          {
            id: subQuestion.id,
            idCode: subQuestion.idCode,
            questionNumber: subQuestion.questionNumber,
            questionDescription: subQuestion.questionDescription,
            containsFormula: subQuestion.containsFormula,
            questionImage: subQuestion.questionImage,
            memo: subQuestion.memo,
            video1Id: subQuestion.video1Id,
            video2Id: subQuestion.video2Id,
            video3Id: subQuestion.video3Id,
            paperId: subQuestion.paperId,
            questionCode: subQuestion.questionCode,
            mark: subQuestion.mark,
            isCompleted: subQuestion.isCompleted,
            isParent: subQuestion.isParent,
            isPreReq: subQuestion.isPreRequisiteQuestion,
            subjectId: subQuestion.subjectId,
            children: [],
          });
      }
    } else {
      for (const question of questions) {
        if (question.children.length > 0) {
          this.setQuestions(subQuestion, question.children);
        }
      }
    }
  }

  buildSearchResultQuestionList(questions: Question[], userQuestions: UserQuestion[]) {
    if (!questions) {
      this.router.navigate(['/dashboard']);
    }

    this.questions = this.setParents(questions);

    userQuestions.map(uq => {
      if (this.questions.find(q => q.id === uq.questionId).isParent) {
        uq.question = {
          isParent: true
        } as Question;
      } else {
        uq.question = {
          isParent: false
        } as Question;
      }
    });

    this.completedStatus = userQuestions;
    if (this.pageReachedViaSearch && !this.urlInclCompleted) {
      this.removeCompletedQuestions(this.completedStatus);
    }

    const temp = [...this.questions];
    for (let index = 0; index < this.questions.length; index++) {
      const question = this.questions[index];
      if (question.preRequisiteQuestions && question.preRequisiteQuestions.length > 0) {
        question.preRequisiteQuestions.forEach(v => temp.splice(index, 0, v));
      }
    }
    this.questions = temp;

    // Remove duplicate pre requisite questions
    for (const quest of this.questions.filter(pq => pq.isPreRequisiteQuestion)) {
      const dupCount = this.questions.filter(q => q && q.id === quest.id).length;
      const index = this.questions.findIndex(q => q && q.id === quest.id && dupCount >= 2 && q.isPreRequisiteQuestion);
      if (index >= 0) {
        this.questions[index] = null;
      }
    }
    this.questions = this.questions.filter(q => q);

    this.questionSearchService.orderedQuestions = this.questions;
    this.setQuestionListItems();

    this.showContent = true;
    this.isLoadingPaper = false;
  }

  removeCompletedQuestions(userQuestions: UserQuestion[]): Question[] {
    // @TODO Will need to update this if we add a filter to show exam mode questions
    const completedIds = userQuestions.filter((c) => c.memoModeCompleted).map((cq) => ({ id: cq.questionId }));

    return _.differenceBy(this.questions, completedIds, 'id');
  }

  getCompletionTime(): string {
    if (this.paper && this.paper.completionTime) {
      return (this.paper.completionTime / 60).toFixed(1) + ' Hours';
    } else {
      return 'Completion time not specified';
    }
  }

  markAsComplete(checked: boolean, questionId: number) {
    this.isMarking = true;
    const allRelatedQuestions = this.questions.filter((q) => q.parentQuestionId === questionId);

    const actions = [];

    if (allRelatedQuestions.length > 0) {
      for (const question of allRelatedQuestions) {
        actions.push(this.questionService.updateCompleteStatus(question.id, checked, !this.isExamMode ? 2 : 1));
        if (this.isExamMode) {
          this.completedStatus.find((q) => q.questionId === question.id).examModeCompleted = checked;
        } else {
          this.completedStatus.find((q) => q.questionId === question.id).memoModeCompleted = checked;
        }
        this.markAsComplete(checked, question.id);
      }
    }
    if (this.isExamMode) {
      this.completedStatus.find((q) => q.questionId === questionId).examModeCompleted = checked;
    } else {
      this.completedStatus.find((q) => q.questionId === questionId).memoModeCompleted = checked;
    }
    actions.push(this.questionService.updateCompleteStatus(questionId, checked, this.isExamMode ? 2 : 1));

    forkJoin(actions).subscribe(() => (this.isMarking = false));
    this.checkAllStatus();
  }

  checkAllStatus() {
    if (this.completedStatus && this.completedStatus.length > 0) {
      const isAllCompleted = this.completedStatus.filter(q => !q.question.isParent).every(
        (c) => this.getQuestionCompleted(c)
      );
      if (isAllCompleted) {
        this.userService.updatePaper(this.paper.id, isAllCompleted, this.isExamMode ? 2 : 1).subscribe();
      } else {
        this.userService.updatePaper(this.paper.id, false, this.isExamMode ? 2 : 1).subscribe();
      }
    }
  }

  getCheckStatus(questionId: number): boolean {
    if (this.completedStatus) {
      const userQuestion = this.completedStatus.filter((q) => q.questionId === questionId)[0];
      if (userQuestion) {
        return this.getQuestionCompleted(userQuestion);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  downloadPdf() {
    this.paperService.getPdfUrl(this.paper.id).subscribe((pdf) => {
      saveAs(pdf.url, pdf.name);
    });
  }

  examToggled() {
    this.isExamMode = !this.isExamMode;
  }

  back() {
    if (this.pageReachedViaSearch) {
      this.location.back();
    } else {
      this.router.navigate(['/subjects/', this.subjectId], {
        queryParams:
          {
            activeTab: SubjectTypeEnum.Papers,
            grade: this.paper.grade.name
          }
      }).then();
    }
  }

  showMemo(question: Question) {
    if (this.hasMemo(question)) {
      this.dialog.open(ImageDialogComponent, {
        data: { imagePath: question.memo },
      });
      this.questionService.addMemoViews(question.id, 1).subscribe();
    }
  }

  setParents(questions: Question[]): Question[] {
    return questions.map(question => {
      if (question) {
        question.isParent = question.video1Id === null;
      }
      return question;
    });
  }

  setStep(index: number) {
    this.selectedIndex = index;
  }


  private sortQuestionItems(questionItems: Array<QuestionItemModel>) {
    for (const questionItem of questionItems) {
      if (questionItem.children.length > 0) {
        questionItem.children = sortQuestionItems(questionItem.children);
      }
    }
    return sortQuestionItems(questionItems);
  }

  

}
