import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrency } from '../models/currency';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private valueService: ValueService) { }

  storageValue$ = new Subject<Object|null>()
  recievedData$ = new Subject<ICurrency[]|null>()

  checkData() {
    const data = localStorage.getItem('currencyName')
    //console.log(data)
    //const parsed = JSON.parse(data || '{}')
    this.storageValue$.next(data)
    return data
  }

  downloadData() {
    return this.valueService.getValue().subscribe(data => {
      this.recievedData$.next(data)
    })
    
  }

  uploadNewData() {
    return localStorage.setItem('currencyName', JSON.stringify({
      first: 'USD',
      second: 'UAH'
    }))
  }

  updateData(first: string, second: string) {
    this.storageValue$.next(JSON.stringify({
      first,
      second
    }))
    return localStorage.setItem('currencyName', JSON.stringify({
      first,
      second
    }))
  }

}
