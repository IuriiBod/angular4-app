import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private Url = 'http://192.34.78.153:5000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  signupUser (user: User): Observable<User> {
    return this.http.post<User>(this.Url + '/clients/', user, this.getHttpOptions());
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.Url + '/clients/' + this.getId() + '/', this.getHttpOptions());
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.Url + '/clients/' + this.getId() + '/', user, this.getHttpOptions());
  }

  updatePassword(password: string): Observable<User> {
    return this.http.patch<User>(this.Url + '/clients/' + this.getId() + '/password/', password, this.getHttpOptions());
  }

  getId() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.client_id;
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Api-Token': 'james-bond',
        'X-Login-Token': this.authService.getToken()
      })
    };
  }

}
