import { Component, OnInit } from '@angular/core';
import { ICurrency } from 'src/app/models/currency';
import { currencys } from 'src/app/models/data';
import { UploadService } from 'src/app/services/upload.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})

export class RateComponent implements OnInit {

  constructor(
    public uploadService: UploadService,
    private valueService: ValueService
  ) { }
  
  currencys: ICurrency[] = []
  baseNumber = '1'
  title: string = 'current rate'
  data: any = ''
  parsed = { first: '', second: '' }
  ids = {
    USD: 840,
    EUR: 978,
    UAH: 980
  }
  parsedIds = { first: 0, second: 0 }
  


  ngOnInit(): void {

    /*
    
    this.valueService.getValue().subscribe(data => {
      this.currencys = data
    })

    */

    this.uploadService.downloadData()

    this.uploadService.recievedData$.subscribe(data => {
      if(data){
          this.currencys.push(data[0])
          this.currencys.push(data[1])
          this.currencys.push(data[2])
      }
      this.baseNumber = '1.00'
    })

    this.data = this.uploadService.checkData()
    this.parsed = JSON.parse(this.data)
    if(this.data){
      this.uploadService.storageValue$.subscribe( value => {
        this.data = value
        this.parsed = JSON.parse(this.data)

        if(this.parsed.first == 'USD'){
          this.parsedIds.first = 840
        }else if(this.parsed.first == 'EUR'){
          this.parsedIds.first = 978
        }else if(this.parsed.first == 'UAH'){
          this.parsedIds.first = 980
        }
  
        if(this.parsed.second == 'USD'){
          this.parsedIds.second = 840
        }else if(this.parsed.second == 'EUR'){
          this.parsedIds.second = 978
        }else if(this.parsed.second == 'UAH'){
          this.parsedIds.second = 980
        }
      })

      if(this.parsed.first == 'USD'){
        this.parsedIds.first = 840
      }else if(this.parsed.first == 'EUR'){
        this.parsedIds.first = 978
      }else if(this.parsed.first == 'UAH'){
        this.parsedIds.first = 980
      }

      if(this.parsed.second == 'USD'){
        this.parsedIds.second = 840
      }else if(this.parsed.second == 'EUR'){
        this.parsedIds.second = 978
      }else if(this.parsed.second == 'UAH'){
        this.parsedIds.second = 980
      }

    }else{
      this.uploadService.uploadNewData()
      window.location.reload()
    }
  }

}
