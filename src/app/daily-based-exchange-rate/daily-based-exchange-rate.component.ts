import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../currency.service';
import {Chart} from 'angular-highcharts';
import {DatepickerOptions} from 'ng2-datepicker';

import * as moment from 'moment';


@Component({
  selector: 'app-daily-based-exchange-rate',
  templateUrl: './daily-based-exchange-rate.component.html',
  styleUrls: ['./daily-based-exchange-rate.component.css']
})
export class DailyBasedExchangeRateComponent implements OnInit {


  chart = {};
  date = moment().format('YYYY-MM-DD');
  tmpDate = this.date;
  exchangeRateForDateAndBase: any;
  base = 'EUR';
  tmpBase = this.base;
  otherCurrencies = [];
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    // minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now())  // Maximal selectable date
  };

  constructor(private _currency: CurrencyService) {
  }


  fetchExchangeRateForDateAndBaseData() {

    this._currency.fetchExchangeRateForDateAndBase(this.date, this.base)
      .subscribe(res => {
        this.exchangeRateForDateAndBase = res;
        const ratesKeysIterator = Object.keys(this.exchangeRateForDateAndBase.rates);
        const data = [];
        let index = 0;
        this.otherCurrencies = [];
        this.otherCurrencies.push(this.base);
        ratesKeysIterator.forEach(element => {
          let val: any[];
          const dicimalVal = parseFloat((this.exchangeRateForDateAndBase.rates[element] / 1000).toFixed(4));
          val = [element, dicimalVal];
          this.otherCurrencies.push(element);
          data.push(val);
          index++;
        });
        this.chart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Exchange rate by date ' + this.exchangeRateForDateAndBase.base + ' : ' + this.exchangeRateForDateAndBase.date
          },
          xAxis: {
            type: 'category',
            labels: {
              rotation: -45,
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [{
            name: '',
            data: data
          }]
        });
      });
  }

  ngOnInit() {
    this.fetchExchangeRateForDateAndBaseData();
  }

  update(currency: any) {
    this.date = moment(this.date).format('YYYY-MM-DD');
    this.base = currency !== undefined ? currency : this.base;
    if (this.tmpBase !== this.base || this.tmpDate !== this.date) {
      this.fetchExchangeRateForDateAndBaseData();
      this.tmpBase = this.base;
      this.tmpDate = this.date;
    }
  }
}
