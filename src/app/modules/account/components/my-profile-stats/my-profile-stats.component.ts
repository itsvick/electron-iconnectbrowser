import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { ProgressCard } from '@shared/models/resource-card';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

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
  gradeOpen = false;
  times: { id: number; name: string }[];
  timeOpen = false;

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

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
