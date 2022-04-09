import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllAccounts } from '../models/all-accounts.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private baseUrl = "https://localhost:5001/metadata"

  constructor(private _http: HttpClient) { }

  getAllAccounts() {
    return this._http.get<AllAccounts>(`${this.baseUrl}/all-accounts`);
  }
}
