import {Component, OnInit} from '@angular/core';
import {AbstractBaseComponent} from '@shared/abstracts/abstract-base-component';
import {Grade, Language, Lesson, Paper, Subject, UserPaper, UserLesson, Keyword} from '@models/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {PaperService} from '@api/services/paper.service';
import {LessonService} from '@api/services/lesson.service';
import {AuthService} from '@api/services/auth.service';
import {UserService} from '@api/services/user.service';
import {SubjectResource} from '@shared/models/subject-resource';
import {GradeService} from '@api/services/grade.service';
import {SubjectsService} from '@api/services/subjects.service';
import {Location, TitleCasePipe} from '@angular/common';
import * as _ from 'lodash';
import {LessonStatus, PaperStatus, PackageType as PackageTypeEnum} from '@models/enum';
import {LanguageService} from '@api/services/language.service';
import {SubjectTypeEnum} from '@shared/models/subject-type';
import {MySubjectResponse} from '@api/models/subject.modle';
import { KeywordService } from '@api/services/keyword.service';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss'],
})
export class SubjectViewComponent extends AbstractBaseComponent implements OnInit {
  activeTab: number;
  myPapers: UserPaper[];
  myLessons: UserLesson[];

  allPapers: Paper[];
  allLessons: Lesson[];
  searchLessonKeywords = true;

  allLanguages: Language[];

  paperResources: SubjectResource[];
  lessonResources: SubjectResource[];

  subject: Subject;
  paperGrades: Grade[];
  lessonGrades: Grade[];

  selectedGrade: Grade;
  subjectId: number;

  paperItems = new BehaviorSubject<any[]>(null);
  lessonItems = new BehaviorSubject<any[]>(null);

  paperIds: number[];
  languages: Language[];
  selectedLanguageId = 1;

  queryGrade: number;
  showUpgrade = true;

  get gradeId(): number {
    return this.selectedGrade.id;
  }

  private currentSubjects: MySubjectResponse[];

  get currentSubject(): MySubjectResponse {
    return this.currentSubjects.find(s => s.grade.id === this.gradeId);
  }

  get hasPapers(): boolean {
    return this.showContent && this.allPapers.filter(p => p.status === 'Live').length > 0;
  }

  get hasLessons(): boolean {
    return this.showContent && this.allLessons.filter(l => l.status === 'Live').length > 0;
  }


  get title() {
    return this.selectedGrade.name === 'NA' || this.selectedGrade.name === 'Post-Mat'
      ? this.selectedGrade.name
      : 'Grade ' + this.selectedGrade.name;
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private paperService: PaperService,
    private lessonService: LessonService,
    private userService: UserService,
    private gradeService: GradeService,
    private subjectService: SubjectsService,
    private router: Router,
    public location: Location,
    private titlecase: TitleCasePipe,
    private languageService: LanguageService,
    private keywordService: KeywordService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    console.log('Query papram: ', +this.route.snapshot.queryParams.activeTab);
    
    switch (+this.route.snapshot.queryParams.activeTab) {
      case SubjectTypeEnum.Papers:
        this.activeTab = SubjectTypeEnum.Papers;
        break;
      case SubjectTypeEnum.Lessons:
        this.activeTab = SubjectTypeEnum.Lessons;
        break;
      default:
        this.activeTab = SubjectTypeEnum.Papers;
        break;
    }

    this.queryGrade = +this.route.snapshot.queryParams.grade;
    this.subjectId = +this.route.snapshot.params.subjectId;
    this.getSubjectGrades().subscribe(() => {
      this.showContent = true;
    });
  }

  findMyPaper(paperId: number): UserPaper | null {
    return this.myPapers && this.myPapers.length > 0 ? this.myPapers.find((mp) => mp.paperId === paperId) : null;
  }

  findMyLesson(lessonId: number): UserLesson | null {
    return this.myLessons && this.myLessons.length > 0 ? this.myLessons.find((ml) => ml.lessonId === lessonId) : null;
  }

 changeTab(tab) {
    this.activeTab = tab.index;
    this.router
      .navigate([`subjects/` + this.subjectId], {
        queryParams: { activeTab: this.activeTab, grade: this.queryGrade },
        skipLocationChange: false,
        replaceUrl: true,
      })
      .then();
  }

  setLanguages() {
    if (this.activeTab === SubjectTypeEnum.Papers) {
      this.languages = _.uniqBy(this.allPapers, 'languageId').map(v => this.allLanguages.find(l => v.languageId === l.id));
    } else if (this.activeTab === SubjectTypeEnum.Lessons) {
      this.languages = _.uniqBy(this.allLessons, 'languageId').map(v => this.allLanguages.find(l => v.languageId === l.id));
    }
    if (Array.isArray(this.languages) && this.languages.length > 0) {
      if (!this.languages.some(l => l.id === this.selectedLanguageId)) {
        this.selectedLanguageId = this.languages[0].id;
      }
    }
  }

  changeLanguage(event) {
    this.selectedLanguageId = this.languages.find((l) => l.id === event).id;


    this.buildPaperResources(this.allPapers.filter(p => p.languageId === this.selectedLanguageId));
    this.buildLessonResources(this.allLessons.filter(l => l.languageId === this.selectedLanguageId));
  }

  getSubjectGrades(): Observable<void> {
    return new Observable((subscriber) => {
      this.isLoading = true;
      this.subjectService.getMySubjects(this.subjectId).subscribe(mySubjectResult => {
        this.currentSubjects = mySubjectResult;
        console.log('My Subject : ', mySubjectResult);
        
        this.paperGrades = mySubjectResult.map(s => {
          if (s.hasPapers) {
            return s.grade;
          }
        }).filter(s => s);
        this.lessonGrades = mySubjectResult.map(s => {
          if (s.hasLessons) {
            return s.grade;
          }
        }).filter(s => s);
        this.paperGrades = _.uniqBy(this.paperGrades, 'id');
        this.lessonGrades = _.uniqBy(this.lessonGrades, 'id');
        if (!this.queryGrade) {
          console.log('inside query grade because grade is not');
          console.log('Before switch : ', this.activeTab, 'Paper Indictor : ', SubjectTypeEnum.Papers);
          
          switch (this.activeTab) {
            
            case SubjectTypeEnum.Papers: {
              console.log('inside papers');
              console.log('paper grades : ', this.paperGrades);
              
              if (this.paperGrades.length > 0 && !this.paperGrades.some(pg => +pg.name === this.queryGrade)) {

                this.queryGrade = +this.paperGrades[0].name;
                console.log('Insideeeeeee => ', this.queryGrade);
                
              } else {
                const subject = mySubjectResult.find(s => s.grade !== null);
                console.log('Subject : ', subject);
                
                if (subject.grade) {
                  this.queryGrade = +subject.grade.name;
                }
              }
              break;
            }
            case SubjectTypeEnum.Lessons: {
              console.log('inside lessons');
              
              if (this.lessonGrades.length > 0 && !this.lessonGrades.some(pg => +pg.name === this.queryGrade)) {
                this.queryGrade = +this.lessonGrades[0].name;
              } else {
                const subject = mySubjectResult.find(s => s.grade !== null);
                if (subject.grade) {
                  this.queryGrade = +subject.grade.name;
                }
              }
              break;
            }
          }
        }
        console.log('Query Grade : ', this.queryGrade);
        
        this.selectedGrade = mySubjectResult.find(s => +s.grade.name === this.queryGrade).grade;

        console.log('selectedGrade', this.selectedGrade);
        
        
        this.queryGrade = +this.selectedGrade.name;
        this.showUpgrade = mySubjectResult.some(s => s.packageTypeId !== PackageTypeEnum.Premium);
        this.languageService.getAllPaginated().subscribe((langResults) => {
          this.allLanguages = langResults.rows as Language[];
          this.getData().subscribe(() => {
            subscriber.next();
            subscriber.complete();
          });
        });
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
          sort: [
            ['year', 'desc'],
            ['month', 'asc'],
            ['name', 'asc'],
            ['paperNo', 'asc'],
          ],
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
            status: PaperStatus.Live,
          },
        }),
        this.lessonService.getAllPaginated({
          page: 1,
          pageSize: 1000,
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
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

        this.setLanguages();
        this.buildPaperResources(this.allPapers.filter(p => p.languageId === this.selectedLanguageId));
        this.buildLessonResources(this.allLessons.filter(l => l.languageId === this.selectedLanguageId));

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
      };
    });
    this.lessonResources = _.orderBy(this.lessonResources, (lesson) => lesson.locked, ['asc']);
  }

  setActiveGrade(grade: Grade) {
    this.selectedGrade = grade;
    this.queryGrade = +this.selectedGrade.name;
    this.getData().subscribe(() => {
      this.changeTab({index: this.activeTab});
      this.showContent = true;
    });
  }

  // Lesson Functions
  lessonCompleted(event: SubjectResource) {
    this.userService.updateLesson(event.id, event.completed).subscribe();
  }

  clearLessonSearch() {
    this.buildLessonResources(this.allLessons);
  }

  lessonSearchChanged(event) {
    this.searchLessonKeywords ?
    this.searchKeywords(event) :
    this.searchLesson(event).subscribe((results) => {
      this.lessonItems.next(results);
    });
  }

  lessonSelected(event) {
    if (this.searchLessonKeywords) {
      this.keywordService.getLessonsByKeyword(this.gradeId, this.subjectId, event.id).subscribe((lessons) => {
        this.buildLessonResources(lessons);
      });
    } else {
      const selectedLesson = this.allLessons.find((lesson) => lesson.id === event.id);
      this.buildLessonResources([selectedLesson]);
    }
  }

  searchLesson(value?: any): Observable<Lesson[]> {
    return new Observable((observer) => {
      this.lessonService
        .getAllPaginated({
          page: 1,
          pageSize: 1000,
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
          },
          search: {
            table: 'lesson',
            columns: ['name'],
            text: value,
          },
        })
        .subscribe((paginatedResults) => {
          observer.next(paginatedResults.rows);
          observer.complete();
        });
    });
  }

  searchKeywords(value?: any) {
    this.keywordService.getKeywordsByLessons(this.allLessons.map((x) => { return x.id }), value, this.gradeId, this.subjectId)
    .subscribe((results) => {
      this.lessonItems.next(results);
    })
  }

  // Paper Functions
  paperCompleted(event: SubjectResource) {
    this.userService.updatePaper(event.id, event.completed, 3, true).subscribe();
  }

  clearPaperSearch() {
    this.buildPaperResources(this.allPapers);
  }

  paperSearchChanged(event) {
    this.searchPaper(event).subscribe((results) => {
      const adjustedResults = results.map((result) => {
        result.name = `Paper ${result.paperNo} - ${this.titlecase.transform(result.month)} - ${result.year}`;
        return result;
      });
      this.paperItems.next(adjustedResults);
    });
  }

  setStatus(value: boolean) {
    this.searchLessonKeywords = value;
  }

  paperSelected(event) {
    const selectedPapers = this.allPapers.find((paper) => paper.id === event.id);
    this.buildPaperResources([selectedPapers]);
  }

  searchPaper(value?: string): Observable<Paper[]> {
    return new Observable((observer) => {
      this.paperService
        .getAllPaginated({
          page: 1,
          pageSize: 1000,
          where: {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
          },
          search: {
            table: 'paper',
            columns: ['month', 'year', 'name', 'id_code' as 'idCode'],
            text: value,
          },
        })
        .subscribe((paginatedResults) => {
          observer.next(paginatedResults.rows);
          observer.complete();
        });
    });
  }

  upgradeSubject() {
    this.router.navigateByUrl('/settings/profile?tab=subscription');
  }

}
