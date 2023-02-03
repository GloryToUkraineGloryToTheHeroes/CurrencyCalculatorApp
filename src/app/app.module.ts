import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FocusDirective } from './directives/focus.directive';
import { ChangeCurrencyPipe } from './pipes/change-currency.pipe';
import { RateComponent } from './components/rate/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FocusDirective,
    ChangeCurrencyPipe,
    RateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
