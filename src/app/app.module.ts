import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DailyBasedExchangeRateComponent } from './daily-based-exchange-rate/daily-based-exchange-rate.component';
import { ChartModule } from 'angular-highcharts';


import { CurrencyService } from './currency.service';


@NgModule({
  declarations: [
    AppComponent,
    DailyBasedExchangeRateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
