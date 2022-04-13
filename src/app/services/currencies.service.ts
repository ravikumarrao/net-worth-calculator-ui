import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { UrlService } from './url.service';
import { map } from "rxjs";

import { registerLocaleData } from '@angular/common';

import localeFrench from "@angular/common/locales/fr";
import localeIndian from '@angular/common/locales/en-IN';
import localeChinese from '@angular/common/locales/zh';
import localeJapanese from '@angular/common/locales/ja';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private _baseUrl: string;
  private _activeCurrency: Currency;

  constructor(private _http: HttpClient, private _urlService: UrlService) {
    this._baseUrl = `${this._urlService.getEnvironmentUrl()}/currencies`;
  }

  get activeCurrency() {
    return this._activeCurrency;
  }

  set activeCurrency(value: Currency) {
    this._activeCurrency = value;
    this.registerLocale(value.locale);
  }

  getCurrencies() {
    return this._http.get<Array<Currency>>(this._baseUrl)
      .pipe(map(c => c.sort((a, b) => a.isoCode.localeCompare(b.isoCode))));
  }

  private registerLocale(locale: string) {
    switch (locale) {
      case 'fr-FR':
        registerLocaleData(localeFrench);
        break;
      case 'en-IN':
        registerLocaleData(localeIndian);
        break;
      case 'zh-CN':
        registerLocaleData(localeChinese);
        break;
      case 'ja-JP':
        registerLocaleData(localeJapanese);
        break;
    }
  }
}
