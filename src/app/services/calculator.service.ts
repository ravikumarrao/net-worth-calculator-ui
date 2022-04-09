import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private baseUrl = "https://localhost:5001/calculator"
  
  constructor(private _http: HttpClient) { }


  getWeatherForecast() {
    return this._http.get<Array<WeatherForecast>>(`${this.baseUrl}/weatherforecast`);
  }
}
