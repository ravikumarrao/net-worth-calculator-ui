import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';
import { UrlService } from './url.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private _http: HttpClient, private _urlService: UrlService, private _usersService: UsersService) { 
  }

  getAccounts(userId: number) {
    return this._http.get<Array<Account>>(this.getAccountsUrl(userId));
  }

  getAccount(accountId: number) {
    return this._http.get<Account>(`${this.getAccountsUrl(this._usersService.activeUser.id)}/${accountId}`);
  }

  updateBalance(account: Account) {
    return this._http.patch(`${this.getAccountsUrl(this._usersService.activeUser.id)}/${account.id}`, account);
  }

  private getAccountsUrl(userId: number) {
    return `${this._urlService.getEnvironmentUrl()}/users/${userId}/accounts`;
  }
}
