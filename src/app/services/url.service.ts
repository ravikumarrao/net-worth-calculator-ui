import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getEnvironmentUrl() {
    return "https://localhost:5001";
  }
}
