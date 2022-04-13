import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NgxSnakeToCamelInterceptor } from './utils/snake-to-camel-case-interceptor';
import { LocaleNumberPipe } from './utils/locale-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    LocaleNumberPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NgxSnakeToCamelInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
