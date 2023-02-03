import { Pipe, PipeTransform } from '@angular/core';
import { ICurrency } from '../models/currency';

@Pipe({
  name: 'changeCurrency'
})

export class ChangeCurrencyPipe implements PipeTransform {

  transform(value: string, firstCurrency: number, secondCurrency: number, currencys: ICurrency[]): number {
    let numberValue: number = Number(value)
    if(firstCurrency == secondCurrency){
      return numberValue
    }
    
    else {
      for(let a = 0; a < currencys.length; a++){
        if( (currencys[a].currencyCodeA == firstCurrency)&&(currencys[a].currencyCodeB == secondCurrency) ){
          let result: any = numberValue*currencys[a].rateBuy
          return result.toFixed(2)
        }else if( (currencys[a].currencyCodeB == firstCurrency)&&(currencys[a].currencyCodeA == secondCurrency) ){
          let result: any = numberValue/currencys[a].rateBuy
          return result.toFixed(2)
        }
      }
    }


    return numberValue
  }

}
