import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseApiService } from './base/base-api-service';
import { Token, User } from '@models/entities';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ChangePassword,
  ForgotPasswordResponse,
  OtpForgotPasswordResponse,
  RegisterResponse
} from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  private _rawToken: string;
  private _authToken: Token;


  constructor(public http: HttpClient, public router: Router, public jwt: JwtHelperService) {
    super('auth');
    this.rawToken = sessionStorage.getItem('token');
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
          this.storeToken = res.rememberToken;
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

  register(model: Partial<User>, saveToken = true): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/register`, model).pipe(
      map((res) => {
        if (res && res.id && res.rememberToken) {
          if (saveToken) {
            this.storeToken = res.rememberToken;
          }
          return res;
        }
      })
    );
  }

  forgotPassword(model: Partial<ForgotPasswordResponse>) {
    return this.http.post<ForgotPasswordResponse>(`${this.url}/forgot_password`, model);
  }

  changePassword(model: Partial<ChangePassword>) {
    return this.http.post(`${this.url}/change_password`, model);
  }

  verifyEmail(token: string) {
    return this.http.post<{ valid: boolean }>(`${this.url}/verify/email`, { token });
  }

  verifySignUpOtp(phoneNumber: string, code: string): any {
    return this.http.post(`${this.url}/verify/otp/sign-up`, { code, phoneNumber });
  }

  verifyPasswordOtp(phoneNumber: string, code: string): Observable<OtpForgotPasswordResponse> {
    return this.http.post<OtpForgotPasswordResponse>(`${this.url}/verify/otp/password`, { code, phoneNumber });
  }

  set storeToken(token: string) {
    if (token) {
      sessionStorage.setItem('token', token);
      this.rawToken = token;
    }
  }

  get isTokenExpired(): boolean {
    return this._rawToken === null || this.jwt.isTokenExpired(this._rawToken);
  }

  get token(): any {
    if (!this.isTokenExpired) {
      return this._authToken;
    }
  }

  set rawToken(token: string) {
    if (token) {
      this._rawToken = token;
      this.decodeToken();
    }
  }

  get rawToken(): string {
    return this._rawToken;
  }

  get roleId(): number {
    return this._authToken.roleId;
  }

  get email(): string {
    return this._authToken.email;
  }

  get isAdminMode(): boolean {
    return this._authToken.isAdmin;
  }

  get userId(): number {
    return this._authToken.id;
  }

  private decodeToken(): void {
    if (this._rawToken) {
      this._authToken = this.jwt.decodeToken(this._rawToken);
    }
  }

  resendInvite() {
    return this.http.post(`${this.url}/resend_invite`, { email: this.email }).pipe(
      map((res: any) => {
        return true;
      })
    );
  }

  resendOtp(phoneNumber: string) {
    return this.http.post(`${this.url}/resend_otp`, { phoneNumber });
  }

  revokeToken(shouldRoute = true): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('getSessionStorage');
    this._rawToken = null;
    this._authToken = null;
    if (shouldRoute) {
      this.router.navigate(['auth/login']).then();
    }
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/me`);
  }

  impersonate(userId: number) {
    return this.http.post(`${this.url}/impersonate`, { userId }).pipe(
      map((res: any) => {
        if (res && res.id && res.rememberToken) {
          sessionStorage.setItem('impersonating', 'true');
          this.storeToken = res.rememberToken;
          this.router.navigate(['/welcome']);
        }
      }));
  }

  checkOnlineState() {
    this.http.get(`dev/ping`).subscribe(() => {
      this.$isOnline.next(true); 
    }, error => {
      this.$isOnline.next(false);
    });
  }
}
