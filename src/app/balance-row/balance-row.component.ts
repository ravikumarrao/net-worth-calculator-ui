import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../models/account.model';

@Component({
  selector: '[balance-row]',
  templateUrl: './balance-row.component.html',
  styleUrls: ['./balance-row.component.less']
})
export class BalanceRowComponent implements OnInit {
  @Input() account: Account;
  @Input() currencySymbol: string;


  constructor() { }

  ngOnInit(): void {
  }

}
