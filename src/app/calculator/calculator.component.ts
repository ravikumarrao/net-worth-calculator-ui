import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account.model';
import { AllAccounts } from '../models/all-accounts.model';
import { Balances } from '../models/balances.model';
import { CalculatorService } from '../services/calculator.service';
import { MetadataService } from '../services/metadata.service';

@Component({
  selector: 'nwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {
  allAccounts: AllAccounts;
  currencySymbol: string = "$";

  balances: Balances;

  constructor(private _metadataService: MetadataService,
    private _calcService: CalculatorService) { }

  ngOnInit(): void {
    this._metadataService.getAllAccounts()
      .subscribe(aa => {
        this.allAccounts = aa;
        this.calculateNetWorth();
      });
  }

  onBalanceChange(account: Account, event: any) {
    account.balance = Number(event.target.value.replace(/[^0-9.-]+/g,""));
    this.calculateNetWorth();
  }

  calculateNetWorth() {
    this._calcService.calculateNetworth(this.allAccounts)
      .subscribe(b => this.balances = b);
  }
}
