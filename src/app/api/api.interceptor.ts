import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, public http: HttpClient,) { }

  // tslint:disable-next-line:max-func-body-length
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req:', req);

    if ((req.url.startsWith('assets/') && req.url.endsWith('.svg')) || req.url.startsWith('http')) {
      req = req.clone({
        setHeaders: {
          'Client-key': 'Ph!no!icApp',
        }
      });
      return next.handle(req);
    }

    // tslint:disable-next-line:max-line-length
    const realRoute =
      req.url.startsWith('auth') ||
      req.url.startsWith('dev') ||
      req.url.toLowerCase().startsWith('users') ||
      req.url.toLowerCase().startsWith('user-types') ||
      req.url.toLowerCase().startsWith('roles') ||
      req.url.toLowerCase().startsWith('schools') ||
      req.url.toLowerCase().startsWith('how-hear') ||
      req.url.toLowerCase().startsWith('sponsors') ||
      req.url.toLowerCase().startsWith('questions') ||
      req.url.toLowerCase().startsWith('payment') ||
      req.url.toLowerCase().startsWith('subscriptions') ||
      req.url.toLowerCase().startsWith('papers') ||
      req.url.toLowerCase().startsWith('grades') ||
      req.url.toLowerCase().startsWith('subjects') ||
      req.url.toLowerCase().startsWith('countries') ||
      req.url.toLowerCase().startsWith('curricula') ||
      req.url.toLowerCase().startsWith('keywords') ||
      req.url.toLowerCase().startsWith('papers') ||
      req.url.toLowerCase().startsWith('lessons') ||
      req.url.toLowerCase().startsWith('orders') ||
      req.url.toLowerCase().startsWith('video-bookmarks') ||
      req.url.toLowerCase().startsWith('videos') ||
      req.url.toLowerCase().startsWith('package-options') ||
      req.url.toLowerCase().startsWith('sections') ||
      req.url.toLowerCase().startsWith('promotions') ||
      req.url.toLowerCase().startsWith('contact-us') ||
      req.url.toLowerCase().startsWith('media-coverages') ||
      req.url.toLowerCase().startsWith('endorsements') ||
      req.url.toLowerCase().startsWith('languages');
    const cachedRoute = false;
    const token = null;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
          "Client-key": 'Ph!no!icApp',
        }
      });
    }


    // this has to done to change the correct routes so that the call goes to our api as the theme has its own calls to a fake db.
    if (realRoute) {  
      req = req.clone({ url: environment.apiUrl + req.url });
    }

    if (cachedRoute && environment.production) {
      // for future useAnimation, get the cached data and return it to the user
    }

    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse): any {
    let message = '';

    if (error.status === 500) {
      message = 'Unknown error has occurred';
    } else {
      message = error.message;
    }

    if (error.status === 403) {
      this.router.navigate(['/403']);
    }

    return throwError(error);

  }
}
