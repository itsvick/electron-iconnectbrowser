import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '@api/services/language.service';
import { Language, Paper, Lesson, UserPaper, UserLesson, Subject } from '@models/entities';
import { PaperService } from '@api/services/paper.service';
import { Observable, forkJoin } from 'rxjs';
import { PaperStatus, LessonStatus } from '@models/enum';
import * as _ from 'lodash';
import { LessonService } from '@api/services/lesson.service';
import { SubjectsService } from '@api/services/subjects.service';
import { SubjectResource } from '@shared/models/subject-resource';

export interface SubjectCardInterface {
  subscription: string;
  icon: string;
  title: string;
  duration: string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {
  @Input()

  cards = [];
  languages: Language[];
  showContent: boolean;
  isLoading: boolean;
  gradeId: number;
  subjectId: number;
  selectedLanguage: Language = { id: 1, name: 'English', code: null };
  allPapers: Paper[];
  allLessons: Lesson[];
  myPapers: UserPaper[];
  myLessons: UserLesson[];
  subject: Subject;
  paperIds: any;
  paperResources: SubjectResource[];
  lessonResources: SubjectResource[];

  constructor(
    private languageService: LanguageService,
    private paperService: PaperService,
    private lessonService: LessonService,
    private subjectService: SubjectsService,
  ) { }

  ngOnInit() {
    this.languageService.getAllPaginated().subscribe((langResults) => {
      this.languages = langResults.rows as Language[];
      this.getData().subscribe(() => {
        this.showContent = true;
      });
    });
  }

  getData() {
    return new Observable((observer) => {
      this.isLoading = true;
      forkJoin([
        this.paperService.getAllPaginated({
          page: 1,
          pageSize: 1000,
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
            status: PaperStatus.Live,
            languageId: this.selectedLanguage.id,
          },
        }),
        this.lessonService.getAllPaginated({
          page: 1,
          pageSize: 1000,
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
            languageId: this.selectedLanguage.id,
            status: LessonStatus.Live,
          },
        }),
        this.paperService.getMyPapers(this.gradeId, this.subjectId),
        this.lessonService.getMyLessons(this.gradeId, this.subjectId),
        this.subjectService.getById(this.subjectId),
      ]).subscribe(([allPapers, allLessons, myPapers, myLessons, subject]) => {
        this.allPapers = allPapers.rows;
        this.allLessons = allLessons.rows;
        this.myPapers = myPapers;
        this.myLessons = myLessons;
        this.subject = subject;

        this.buildPaperResources(this.allPapers);
        this.buildLessonResources(this.allLessons);

        observer.next();
        observer.complete();
      });
    });
  }

  buildPaperResources(papers: Paper[]) {
    this.paperResources = papers.map((paper) => {
      const myPaper = this.findMyPaper(paper.id);
      return {
        id: paper.id,
        title: `${paper.name}`,
        subTitle: `${paper.month} ${paper.year}`,
        imageUrl: myPaper && myPaper.paper ? myPaper.paper.thumbnail : null,
        completed: myPaper ? (myPaper.memoModeCompleted || myPaper.examModeCompleted) : false,
        locked: !myPaper,
        footerText: `Paper ${paper.paperNo}`,
        year: paper.year,
        type: 'paper',
        //TODO: ADD CORRECT NUMBER
        completionTime: 1,
      };
    });
    this.paperResources = _.orderBy(this.paperResources, (paper) => paper.year, ['desc']);
    this.paperResources = _.orderBy(this.paperResources, (paper) => paper.locked, ['asc']);
    this.paperIds = this.paperResources.map((p) => p.id);
  }

  buildLessonResources(lessons: Lesson[]) {
    this.lessonResources = lessons.map((lesson) => {
      const myLesson = this.findMyLesson(lesson.id);
      return {
        id: lesson.id,
        title: lesson.name,
        imageUrl: myLesson && myLesson.lesson ? myLesson.lesson.thumbnail : null,
        completed: myLesson ? myLesson.completed : false,
        locked: !myLesson,
        footerText: lesson.completionTime ? `${lesson.completionTime} Minutes` : 'Not specified',
        type: 'lesson',
        //TODO: ADD CORRECT NUMBER
        completionTime: 1,
      };
    });
    this.lessonResources = _.orderBy(this.lessonResources, (lesson) => lesson.locked, ['asc']);
  }

  findMyPaper(paperId: number) {
    return this.myPapers && this.myPapers.length > 0 ? this.myPapers.find((mp) => mp.paperId === paperId) : null;
  }

  findMyLesson(lessonId: number) {
    return this.myLessons && this.myLessons.length > 0 ? this.myLessons.find((ml) => ml.lessonId === lessonId) : null;
  }

  fakeApiCall() {
    const addSubjectCard: SubjectCardInterface[] = [{
      subscription: 'standard',
      icon: './../../../assets/svg/icon_math.svg',
      title: 'Paper 1',
      duration: '3 Hours'
    },
    {
      subscription: 'upgraded',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 2',
      duration: '3 Hours'
    },
    {
      subscription: 'standard',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 3',
      duration: '3 Hours'
    },
    {
      subscription: 'upgraded',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 4',
      duration: '3 Hours'
    },
    {
      subscription: 'upgraded',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 5',
      duration: '3 Hours'
    },
    {
      subscription: 'standard',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 6',
      duration: '3 Hours'
    },
    {
      subscription: 'upgraded',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 7',
      duration: '3 Hours'
    },
    {
      subscription: 'upgraded',
      icon: './../../../assets/svg/icon_science.svg',
      title: 'Paper 8',
      duration: '3 Hours'
    }];
    this.cards.push(...addSubjectCard);
  }

}
