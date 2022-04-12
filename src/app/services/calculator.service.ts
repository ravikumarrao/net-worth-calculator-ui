import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Balances } from '../models/balances.model';
import { UrlService } from './url.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private baseUrl: string;
  
  constructor(private _http: HttpClient, private _urlService: UrlService) { 
    this.baseUrl = `${this._urlService.getEnvironmentUrl()}`;
  }

  calculateNetworth(user: User) {
    return this._http.get<Balances>(`${this.baseUrl}/users/${user.id}/net-worth`);
  }
}
