import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User, FirebaseAuthResponse } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    const expireDate = new Date(
      localStorage.getItem('firebase-token-expire-date')
    );
    if (new Date() > expireDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  private setToken(response: FirebaseAuthResponse): void {
    const expireDate = new Date(
      new Date().getTime() + Number(response.expiresIn) * 1000
    );

    localStorage.setItem('firebase-token', response.idToken);
    localStorage.setItem('firebase-token-expire-date', expireDate.toString());
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      default:
        this.error$.next('Something went wrong');
    }

    return throwError(error);
  }

  login(requestData: User): Observable<any> {
    requestData.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        requestData
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
