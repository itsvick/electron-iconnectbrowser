import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '@api/services/auth.service';
import { SubjectsService } from '@api/services/subjects.service';
import { Subject as SubjectModel, User } from '@models/entities';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private readonly _subjects: Subject<SubjectModel[]>;
  private readonly _user: Subject<User>;

  get subjects(): Observable<SubjectModel[]> {
    return this._subjects;
  }
  get userSubscription(): Observable<User> {
    return this._user;
  }

  set user(value: User) {
    this._user.next(value);
  }

  constructor(private authService: AuthService, private subjectService: SubjectsService) {
    this._subjects = new Subject<SubjectModel[]>();
    this._user = new Subject<User>();
  }

  public loadMySubject() {
    this.subjectService.getMySubjectsFiltered().subscribe({
      next: (subjects) => {
        this._subjects.next(subjects);
      },
      error: (err) => {
        this._subjects.next(null);
      },
    });
  }

  public loadUser() {
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    });
  }
}
