import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { User } from '../models/user.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string;

  constructor(private _http: HttpClient, private _urlService: UrlService) { 
    this.baseUrl = `${this._urlService.getEnvironmentUrl()}/users`;
  }

  getDummyUserId() {
    return 42;
  }

  getUsers() {
    return this._http.get<Array<User>>(this.baseUrl);
  }

  getUser(userId: number) {
    return this._http.get<User>(`${this.baseUrl}/${userId}`);
  }

  updateUser(user: User) {
    return this._http.patch(`${this.baseUrl}/${user.id}`, user);
  }
}
