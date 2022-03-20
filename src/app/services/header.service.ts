import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '@api/services/auth.service';

import { User } from '@models/entities';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private readonly _user: Subject<User>;


  get userSubscription(): Observable<User> {
    return this._user;
  }

  set user(value: User) {
    this._user.next(value);
  }

  constructor(private authService: AuthService) {
    this._user = new Subject<User>();
  }

  public loadMySubject() {}

  public loadUser() {
  }
}
