import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

import { Lead} from '../models/leads.model';

@Injectable()
export class LeadsService {
  private Url = 'http://192.34.78.153:5000/leads/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getLeads(): Observable<Lead[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Api-Token': 'james-bond',
        'X-Login-Token': this.authService.getToken()
      })
    };

    return this.http.get<Lead[]>(this.Url, httpOptions);
  }
}
