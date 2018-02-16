import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private Url = 'http://192.34.78.153:5000';
  private token: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Api-Token': 'james-bond'
    })
  };

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<User> {
    return this.http.post<any>( this.Url + '/clients/login/', { email: email, password: password }, this.httpOptions)
      .map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.token = user.token;
        }

        return user;
      });
  }

  getToken() {
    return this.token || '';
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
