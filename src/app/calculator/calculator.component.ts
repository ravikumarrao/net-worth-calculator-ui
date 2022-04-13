import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account.model';
import { Balances } from '../models/balances.model';
import { Currency } from '../models/currency.model';
import { AccountService } from '../services/account.service';
import { CalculatorService } from '../services/calculator.service';
import { CurrenciesService } from '../services/currencies.service';
import { UsersService } from '../services/users.service';
import { GroupedAccounts } from '../models/grouped-accounts.model';


@Component({
  selector: 'nwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {
  groupedAccounts: GroupedAccounts;

  balances: Balances;
  currencies: Array<Currency>;

  constructor(private _usersService: UsersService,
    private _accountsService: AccountService,
    private _currenciesService: CurrenciesService,
    private _calcService: CalculatorService) { }

  get activeCurrency() {
    return this._currenciesService.activeCurrency;
  }

  set activeCurrency(value: Currency) {
    this._currenciesService.activeCurrency = value;
  }

  ngOnInit(): void {
    this._usersService.loadDummyUser()
      .subscribe(u => {

        this._currenciesService.getCurrencies()
          .subscribe(currencies => {
            this.currencies = currencies;
            this._currenciesService.activeCurrency = currencies.filter(c => c.isoCode == u.currency)[0];

            this.refreshAccountsAndBalances();
          });
      })
  }

  refreshAccountsAndBalances() {
    this._accountsService.getAccounts(this._usersService.activeUser.id)
      .subscribe(accounts => {
        this.groupedAccounts = <GroupedAccounts>accounts.reduce(function (r, a) {
          r[a.subType] = r[a.subType] || [];
          r[a.subType].push(a);
          return r;
        }, Object.create(null));

        this.calculateNetWorth();
      });
  }

  onBalanceChange(account: Account, event: any) {
    account.balance = Number(event.target.value.replace(/[^0-9.-]+/g, ""));
    this._accountsService.updateBalance(account)
      .subscribe(_ => this.calculateNetWorth());
  }

  onCurrencyChange(newCurrency: Currency) {
    this._usersService.activeUser.currency = newCurrency.isoCode;
    this._usersService.updateUser(this._usersService.activeUser)
      .subscribe(_ => this.refreshAccountsAndBalances());
  }

  calculateNetWorth() {
    this._calcService.getNetWorth()
      .subscribe(b => this.balances = b);
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isGreen() {
    return this.activeCurrency?.locale == "zh-CN" || this.activeCurrency.locale == "ja-JP" ? this.balances?.netWorth < 0 : this.balances?.netWorth > 0;
  }
}
