import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-daily-based-exchange-rate',
  templateUrl: './daily-based-exchange-rate.component.html',
  styleUrls: ['./daily-based-exchange-rate.component.css']
})
export class DailyBasedExchangeRateComponent implements OnInit {

  constructor(private _currency: CurrencyService) { }
  chart = {};
  ngOnInit() {
    this._currency.fetchExchangeRateForDateAndBase('2018-01-02', 'EUR')
      .subscribe(res => {
        let ratesKeysIterator = Object.keys(res.rates);
        let data = [];

        let index = 0;
        ratesKeysIterator.forEach(element => {
          let val = [];
          val = [element, res.rates[element] / 10000];
          data.push(val);
          index++;
        });
        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Exchange rate by date ' + res.base + ' : ' + res.date
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
          series: [{
            name: '',
            data: data
          }]
        })
      })
  }

}
