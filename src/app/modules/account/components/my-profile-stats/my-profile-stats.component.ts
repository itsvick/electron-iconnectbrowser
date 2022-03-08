import { Component, OnInit } from '@angular/core';
import { GradeService } from '@api/services/grade.service';
import { SubjectsService } from '@api/services/subjects.service';
import { UserService } from '@api/services/user.service';
import { HeaderService } from '@app/services/header.service';
import { Grade, Subject, User } from '@models/entities';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { ProgressCard } from '@shared/models/resource-card';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin, of, Observable } from 'rxjs';

@Component({
  selector: 'app-my-profile-stats',
  templateUrl: './my-profile-stats.component.html',
  styleUrls: ['./my-profile-stats.component.scss']
})
export class MyProfileStatsComponent extends AbstractBaseComponent implements OnInit {

  filterOptions = {
    gradeId: null,
    subjectId: null,
    fromDate: null,
  } as any;

  // Tab 2 (Progress)
  grades: Grade[];
  gradeOpen = false;
  times: { id: number; name: string }[];
  timeOpen = false;
  subjects: Subject[];
  subjectOpen = false;

  sectionOpen = false;

  filterTimes = [
    {
      id: 0,
      name: 'This Week',
      value: moment().startOf('week').format('YYYY-MM-DD'),
    },
    {
      id: 1,
      name: 'This Month',
      value: moment().startOf('month').format('YYYY-MM-DD'),
    },
    {
      id: 2,
      name: 'This Year',
      value: moment().startOf('year').format('YYYY-MM-DD'),
    },
    {
      id: 3,
      name: 'All Time',
      value: null,
    },
  ];

  stats: ProgressCard[];
  $statsLoading = new BehaviorSubject(true);
  roleId: number;
  children: User[];

  constructor(
    private userService: UserService,
    private gradeService: GradeService,
    private subjectService: SubjectsService,
    private headerService: HeaderService) {
    super();
  }



  ngOnInit(): void {
    this.isLoading = true;
    this.headerService.loadMySubject();
    forkJoin([this.gradeService.getMyGrades(), of(this.filterTimes), this.subjectService.getMySubjectsFiltered()]).subscribe(
      ([grades, times, subjects]) => {
        this.grades = grades;
        this.times = times;
        this.subjects = subjects;

        this.getProgress().subscribe(() => {
          setTimeout(() => {
            this.$statsLoading.next(false);
            this.showContent = true;
          }, 1500);
        });
      },
    );
  }


  getProgress() {
    this.$statsLoading.next(true);
    return new Observable((observer) => {
      this.userService.getMetrics(this.filterOptions).subscribe((metrics) => {
        this.stats = metrics;
        observer.next();
        observer.complete();
      });
    });
  }


  selectedGrade(event) {
    this.filterOptions.gradeId = event.id;
    this.gradeOpen = false;
    this.getProgress().subscribe(() => {
      this.$statsLoading.next(false);
    });
  }

  selectedTime(event) {
    this.filterOptions.fromDate = event.value;
    this.timeOpen = false;
    this.getProgress().subscribe(() => {
      this.$statsLoading.next(false);
    });
  }

  selectedSubject(event) {
    this.filterOptions.subjectId = event.id;
    this.subjectOpen = false;
    this.getProgress().subscribe(() => {
      this.$statsLoading.next(false);
      // this.sectionService.getBySubjectId(event.id)
      //   .subscribe((sections) => {
      //     this.sections = sections;
      //     this.$statsLoading.next(false);
      //   });
    });
  }

}
