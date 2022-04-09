import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/weather-forecast.model';
import { Balances } from '../models/balances.model';
import { AllAccounts } from '../models/all-accounts.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private baseUrl = "https://localhost:5001/calculator"
  
  constructor(private _http: HttpClient) { }


  calculateNetworth(allAccounts: AllAccounts) {
    return this._http.post<Balances>(`${this.baseUrl}/calculate-net-worth`, allAccounts);
  }
}
