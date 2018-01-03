import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {

  constructor(private _http: HttpClient) { }

  fetchExchangeRateForDateAndBase(date: string, base: string) {
    return this._http.get("https://api.fixer.io/" + date + "?base=" + base)
      .map(result => result);
  }

}
