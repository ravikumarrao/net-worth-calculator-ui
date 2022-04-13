import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Balances } from '../models/balances.model';
import { UrlService } from './url.service';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private baseUrl: string;
  
  constructor(private _http: HttpClient, private _urlService: UrlService, private _usersService: UsersService) { 
    this.baseUrl = `${this._urlService.getEnvironmentUrl()}`;
  }

  getNetWorth() {
    return this._http.get<Balances>(`${this.baseUrl}/users/${this._usersService.activeUser.id}/net-worth?currency=${this._usersService.activeUser.currency}`);
  }
}
