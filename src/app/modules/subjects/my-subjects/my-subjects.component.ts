import { Component, OnInit, Input } from '@angular/core';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { AuthService } from '@api/services/auth.service';
import { SubjectsService } from '@api/services/subjects.service';
import { GradeService } from '@api/services/grade.service';
import { UserService } from '@api/services/user.service';
import { Router } from '@angular/router';
import { UpdateSubjectService } from '@app/services/update-subject.service';
import { PackageType, UserTypes } from '@models/enum';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SubscriptionService } from '@api/services/subscription.service';

export interface SubjectCardInterface {
  id?: number;
  backgroundImage: string;
  color?: string;
  icon: string;
  title: string;
  subtitle: string;
  show: boolean;
  isFree?: boolean;
}

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.scss']
})

export class MySubjectsComponent extends AbstractBaseComponent implements OnInit {
  calculatedIndex = 0;
  displayEmptyState = false;
  cards: SubjectCardInterface[];
  roleId: number;
  children: any;
  colors = ['green', 'purple', 'aqua', 'pink', 'orange'];
  packageType: any;

  constructor(
    private authService: AuthService,
    private subjectService: SubjectsService,
    private userService: UserService,
    private updateSubjectService: UpdateSubjectService,
    private subscriptionService: SubscriptionService
  ) {
    super();
    this.roleId = this.authService.roleId;
  }

  get isParent() {
    return this.roleId === UserTypes.Parent;
  }

  get packageTypeName(): string {
    switch (this.packageType) {
      case PackageType.Free: {
        return 'Free';
      }
      case PackageType.Standard: {
        return 'Standard';
      }
      case PackageType.Premium: {
        return 'Premium';
      }
      default: {
        return '';
      }
    }
  }

  ngOnInit() {
    this.setCards();
    this.isLoading = true;
    this.subscriptionService.getMySubscriptionPackageType().subscribe(result => {
      this.packageType = result;
      this.updateSubjectService.loadMySubject();
      if (this.isParent) {
        this.userService.getChildren().subscribe((childrenResult) => {
          this.children = childrenResult;
          this.showContent = true;
        });
      } else {
        this.loadSubjects().subscribe(() => {
          this.showContent = true;
        });
      }
    });
  }

  loadSubjects() {
    return new Observable((observer) => {
      this.subjectService
        .getMySubjects().subscribe((subjects) => {
          if (subjects) {
            const freeSubjects = subjects.filter((subject) => subject.isFree);
            const paidSubjects = subjects.filter((subject) => !subject.isFree);
            if (freeSubjects) {
              this.cards.forEach(card => {
                const sub = freeSubjects.find(s => s.id === card.id);
                if (sub) {
                  console.log('free sub', sub);
                  card.isFree = true;
                  card.show = true;
                  card.subtitle = `Free`;
                }
              });
            }

            if (paidSubjects) {
              this.cards.forEach(card => {
                const sub = paidSubjects.find(s => s.id === card.id);
                if (sub) {
                  console.log('paid sub', sub);
                  card.isFree = false;
                  card.show = true;
                  card.subtitle = ``;
                }
              });
            }
            this.displayEmptyState = false;
          } else {
            this.displayEmptyState = true;
          }

          observer.next();
          observer.complete();
        });
    });
  }

  setCards() {

    const subjectIcons = [
      'assets/svg/Group_837.svg',
      'assets/svg/Group_838.svg',
      'assets/svg/Group_839.svg',
      'assets/svg/Group_840.svg',
      'assets/svg/Group_841.svg',
      'assets/svg/Group_842.svg'];
    this.cards = [{
      id: 1,
      backgroundImage: 'standard',
      color: this.colors[0],
      icon: subjectIcons[0],
      title: 'Accounting',
      subtitle: '',
      show: false
    },
    {
      id: 2,
      backgroundImage: 'standard',
      color: this.colors[1],
      icon: subjectIcons[1],
      title: 'Life Sciences',
      subtitle: '',
      show: false
    },
    {
      id: 3,
      backgroundImage: 'standard',
      color: this.colors[2],
      icon: subjectIcons[2],
      title: 'Mathematics',
      subtitle: '',
      show: false
    },
    {
      id: 4,
      backgroundImage: 'standard',
      color: this.colors[3],
      icon: subjectIcons[3],
      title: 'Physical Sciences',
      subtitle: '',
      show: false
    },
    {
      id: 6,
      backgroundImage: 'standard',
      color: this.colors[4],
      icon: subjectIcons[5],
      title: 'Natural Sciences',
      subtitle: '',
      show: false
    },
    {
      id: 5,
      backgroundImage: 'standard',
      color: this.colors[0],
      icon: subjectIcons[4],
      title: 'Uni-maths',
      subtitle: '',
      show: false
    },
    {
      id: 7,
      backgroundImage: 'standard',
      color: this.colors[1],
      icon: subjectIcons[3], //@todo there is no icon for Geography
      title: 'Geography',
      subtitle: '',
      show: false
    },];
  }
}
