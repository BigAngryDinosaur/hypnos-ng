import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface IUserCredentials {
  username: string
  password: string
}

interface IUser {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = "//localhost:8082";
  user?: IUser;

  constructor(private httpClient: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    return this.user != undefined
  }

  login(credentials: IUserCredentials): Observable<IUser> {

    return new Observable<IUser>(observer => {
      var headers = new HttpHeaders(credentials ? {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`
      }: {});
      this.httpClient
      .get<IUser>(`${this.baseURL}/user`, { headers: headers })
      .subscribe(response => {
        if (response['name'] != null) {
          this.user = response
          observer.next(response)
        } else {
          observer.error()
        }
      })
    })
  }

  logout() {

    this.httpClient
      .post(`${this.baseURL}/logout`, {})
      .pipe(
        finalize(() => {
          this.router.navigateByUrl('/');
      })
    )
    .subscribe(res => {
      this.user = undefined;
    })
  }
}
