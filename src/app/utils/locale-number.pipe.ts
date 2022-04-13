import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';
import { CurrenciesService } from '../services/currencies.service';

@Pipe({
  name: 'localeNumber'
})
export class LocaleNumberPipe implements PipeTransform {

  constructor(private _currenciesService: CurrenciesService) { }

    transform(value: any, format: string) {
        if (value == null) { return ''; } // !value would also react to zeros.
        if (!format) { format = '1.2-2'; }

        return formatNumber(value, this._currenciesService.activeCurrency.locale, format);
    }
}
