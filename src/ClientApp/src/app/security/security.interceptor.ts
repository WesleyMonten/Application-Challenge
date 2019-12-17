import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add token, if available
    let token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    // redirect to login on auth fail
    // TODO: could be handled better?
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 && !(this._router.url == '/login' || this._router.url == '/register')) {
          // noinspection JSIgnoredPromiseFromCall
          this._router.navigate(['login']);
        }
        return throwError("exception during http request", err);
      }));
  }
}
