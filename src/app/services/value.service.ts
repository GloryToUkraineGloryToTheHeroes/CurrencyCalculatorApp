import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICurrency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})

export class ValueService {

  constructor(private http: HttpClient) { }


  getValue(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://api.monobank.ua/bank/currency', {
      params: new HttpParams({
        fromObject: {limit : 3}
      })
    })
  }
}
