import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGaugeModule } from 'ngx-gauge';
import {SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { BoardNuevoComponent } from './board-nuevo/board-nuevo.component';
import { GaugeCardComponent } from './gauge-card/gauge-card.component';

const config: SocketIoConfig = {
  url: 'http://estacion.ccaitese.com:3000/', //url: 'http://localhost:3000',  http://estacion.ccaitese.com:3000/'
  options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    BoardNuevoComponent,
    GaugeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule,

    SocketIoModule.forRoot(config),
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
