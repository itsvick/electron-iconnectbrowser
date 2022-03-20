import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseApiService } from './base/base-api-service';
import { User } from '@models/entities';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  constructor(public http: HttpClient, public router: Router, public jwt: JwtHelperService) {
    super('auth');
  }

  $isOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isOnline() {
    return this.$isOnline;
  }

  // login
  authenticate(model: Partial<User>): any {

    return this.http.post(`https://api.aixunhuan.com.cn/api/v1.0/user/signin`, model).pipe(
      map((res: any) => {
        console.log('res :', res);
        
        if (res && res.code === '0000') {
          sessionStorage.setItem('impersonating', 'false');
          // if (res.isActive) {
            this.router.navigate(['browser']);
          // } else {
            // TODO: add login type to usermodel (ie. email, mobile, social media..)
            // TODO: confirm OTP does not work as the phone number param is not included.
            // const verifyRoute = model.loginCred === model.email ? 'confirm-email' : 'confirm-otp';
            // this.router.navigate(['auth', verifyRoute]);
          // }
        }
        return res;
      })
    );
  }
  
  checkOnlineState() {
    this.http.get(`dev/ping`).subscribe(() => {
      this.$isOnline.next(true); 
    }, error => {
      this.$isOnline.next(false);
    });
  }
}
