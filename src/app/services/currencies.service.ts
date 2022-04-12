import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private baseUrl: string;

  constructor(private _http: HttpClient, private _urlService: UrlService) { 
    this.baseUrl = `${this._urlService.getEnvironmentUrl()}/currencies`;
  }

  getCurrencies() {
    return this._http.get<Array<Currency>>(this.baseUrl);
  }
}
