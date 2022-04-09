import { Component, OnInit } from '@angular/core';
import { AllAccounts } from '../models/all-accounts.model';
import { CalculatorService } from '../services/calculator.service';
import { MetadataService } from '../services/metadata.service';

@Component({
  selector: 'nwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {
  allAccounts: AllAccounts;
  totalAssets: number;
  totalLiabilities: number;
  currencySymbol: string = "$";


  constructor(private _service: MetadataService) { }

  ngOnInit(): void {
    this._service.getAllAccounts()
      .subscribe(aa => this.allAccounts = aa);
  }
}
