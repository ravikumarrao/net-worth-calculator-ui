import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NgxSnakeToCamelInterceptor } from './utils/snake-to-camel-case-interceptor';
import { BalanceRowComponent } from './balance-row/balance-row.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    BalanceRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NgxSnakeToCamelInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }