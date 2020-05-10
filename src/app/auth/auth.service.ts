import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

export const TOKEN_NAME = 'jwt_token';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable()
export class AuthService {
  private isLogin = new Subject<any>();
  private url = 'api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _authorizedSubject = new Subject<any>();
  constructor(private http: HttpClient) {}

  get isLogined() {
    return this.isLogin;
  }

  setIsLogined(val: boolean) {
    this.isLogin.next(val);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    if (!token){
      this._authorizedSubject.next({login: false});
    }
  }
  signOut(): any {
    localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    if (!token) { return null; }
    const decoded = jwt_decode(token);

    const expirationDate = decoded.token_expiration_date;
    if (expirationDate === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(expirationDate);
    return date;
  }

  get loginStatus(){
    return this._authorizedSubject;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user) {
    return this.http
      .post<LoginToken>(`${this.url}/auth`,
        {
          username: user.username,
          password: user.password
        },
        {
          headers: this.headers
        }
      )
      .pipe(
        // catchError(this.handleError), tap(resData => {
        //   this.handleAuthentication(
        //     resData.localId,
        //     resData.email,
        //     resData.idToken,
        //     +resData.expiresIn
        //   );
        // })
        map(val => {
          this.setToken(val.token);
          this._authorizedSubject.next({login: true});
          console.log(this.getTokenExpirationDate(val.token));
        })
      );
  }

  register(user) {
    return this.http
      .post<LoginToken>(`${this.url}/auth`,
        {
          username: user.username,
          password: user.password
        },
        {
          headers: this.headers
        }
      )
      .pipe(
        // catchError(this.handleError), tap(resData => {
        //   this.handleAuthentication(
        //     resData.localId,
        //     resData.email,
        //     resData.idToken,
        //     +resData.expiresIn
        //   );
        // })
        map(val => {
          this.setToken(val.token);
          this._authorizedSubject.next({login: true});
          console.log(this.getTokenExpirationDate(val.token));
        })
      );
  }
}
export interface LoginToken {
  token: string;
}
