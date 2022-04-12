import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account.model';
import { Balances } from '../models/balances.model';
import { Currency } from '../models/currency.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CalculatorService } from '../services/calculator.service';
import { CurrenciesService } from '../services/currencies.service';
import { UsersService } from '../services/users.service';

import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { GroupedAccounts } from '../models/grouped-accounts.model';


@Component({
  selector: 'nwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {
  user: User;

  groupedAccounts: GroupedAccounts;
  activeCurrency: Currency;

  balances: Balances;
  currencies: Array<Currency>;

  constructor(private _usersService: UsersService,
    private _accountsService: AccountService,
    private _currenciesServices: CurrenciesService,
    private _calcService: CalculatorService) { }

  ngOnInit(): void {
    this._usersService.getUser(this._usersService.getDummyUserId())
      .subscribe(u => {
        this.user = u;

        this._accountsService.getAccounts(u.id)
          .subscribe(accounts => {
            this.groupedAccounts = <GroupedAccounts>accounts.reduce(function (r, a) {
              r[a.subType] = r[a.subType] || [];
              r[a.subType].push(a);
              return r;
            }, Object.create(null));

            this.calculateNetWorth();
          });

        this._currenciesServices.getCurrencies()
          .subscribe(currencies => {
            this.currencies = currencies;
            this.activeCurrency = currencies.filter(c => c.isoCode == u.currency)[0];
          });

      })
  }

  onBalanceChange(account: Account, event: any) {
    account.balance = Number(event.target.value.replace(/[^0-9.-]+/g, ""));
    this._accountsService.updateBalance(this.user, account)
      .subscribe(_ => this.calculateNetWorth());
  }

  onCurrencyChange(newCurrency: Currency) {
      this.user.currency = newCurrency.isoCode;
      this._usersService.updateUser(this.user)
        .subscribe(_ => this.calculateNetWorth());
  }

  calculateNetWorth() {
    this._calcService.calculateNetworth(this.user)
      .subscribe(b => this.balances = b);
  }
}
