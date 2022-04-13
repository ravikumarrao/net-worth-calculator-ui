import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { User } from '../models/user.model';
import { UrlService } from './url.service';

import { map, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _baseUrl: string;
  private _activeUser: User;

  constructor(private _http: HttpClient, private _urlService: UrlService) {
    this._baseUrl = `${this._urlService.getEnvironmentUrl()}/users`;
  }

  get activeUser() {
    return this._activeUser;
  }

  loadDummyUser(): Observable<User> {
    let DUMMY_USER_ID = 42;
    return this.getUser(DUMMY_USER_ID)
      .pipe(map<User, User>(u => {
        this._activeUser = u;
        return u;
      }));
  }

  getUsers() {
    return this._http.get<Array<User>>(this._baseUrl);
  }

  getUser(userId: number): Observable<User> {
    return this._http.get<User>(`${this._baseUrl}/${userId}`);
  }

  updateUser(user: User) {
    return this._http.patch(`${this._baseUrl}/${user.id}`, user)
      .pipe(map(_ => this._activeUser = user));
  }
}
