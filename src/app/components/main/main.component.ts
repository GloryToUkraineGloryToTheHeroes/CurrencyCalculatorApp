import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ICurrency } from "src/app/models/currency";
import { currencys } from "src/app/models/data";
import { UploadService } from "src/app/services/upload.service";
import { ValueService } from "src/app/services/value.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

    constructor(
        private valueService: ValueService,
        public uploadService: UploadService
    ) {}

    currencys: ICurrency[] = []
    entered = ''
    selectedValue: any = ''
    selectedOutputValue: any = ''
    valueToChange = ''
    recievedData$ = new Subject<ICurrency[]|null>()

    allValues = [{
        id: 840,//save currency in localstorage
        name: 'USD'
    },{
        id: 978,
        name: 'EUR'
    },{
        id: 980,
        name: 'UAH'
    }]

    changeValueLocalStorage() {
        if(this.selectedValue == 840) {
            if(this.selectedOutputValue == 840) {
                this.uploadService.updateData('USD', 'USD')
            }else if(this.selectedOutputValue == 978) {
                this.uploadService.updateData('USD', 'EUR')
            }else if(this.selectedOutputValue == 980) {
                this.uploadService.updateData('USD', 'UAH')
            }
        }else if(this.selectedValue == 978) {
            if(this.selectedOutputValue == 840) {
                this.uploadService.updateData('EUR', 'USD')
            }else if(this.selectedOutputValue == 978) {
                this.uploadService.updateData('EUR', 'EUR')
            }else if(this.selectedOutputValue == 980) {
                this.uploadService.updateData('EUR', 'UAH')
            }
        }else if(this.selectedValue == 980) {
            if(this.selectedOutputValue == 840) {
                this.uploadService.updateData('UAH', 'USD')
            }else if(this.selectedOutputValue == 978) {
                this.uploadService.updateData('UAH', 'EUR')
            }else if(this.selectedOutputValue == 980) {
                this.uploadService.updateData('UAH', 'UAH')
            }
        }
    }


    onValueChange(changedValue: string) {
        this.selectedValue = changedValue
    }
    
    onOutputValueChange(changedValue: string) {
        this.selectedOutputValue = changedValue
    }

    data: any = ''
    parsed = { first: '', second: '' }
    
    ngOnInit(): void {

        /*
        
        this.valueService.getValue().subscribe(data => {
            this.currencys = data
            this.recievedData$.next(data)
            console.log(data)
        })

        */

        //this.uploadService.downloadData()

        this.uploadService.recievedData$.subscribe(data => {
            if(data){
                this.currencys.push(data[0])
                this.currencys.push(data[1])
                this.currencys.push(data[2])
            }
        })

        this.data = this.uploadService.checkData()
        this.parsed = JSON.parse(this.data)

        if(this.parsed.first == 'USD'){
            this.onValueChange('840')
        }else if(this.parsed.first == 'EUR'){
            this.onValueChange('978')
        }else if(this.parsed.first == 'UAH'){
            this.onValueChange('980')
        }

        if(this.parsed.second == 'USD'){
            this.onOutputValueChange('840')
        }else if(this.parsed.second == 'EUR'){
            this.onOutputValueChange('978')
        }else if(this.parsed.second == 'UAH'){
            this.onOutputValueChange('980')
        }

        
    }

}