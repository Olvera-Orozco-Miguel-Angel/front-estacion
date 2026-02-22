
/* 
  servicio en el cual se implementan los metodos que nos permiten recivir los datos del backend
*/ 
import { Injectable } from '@angular/core';

import {Socket} from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketServerService {

  constructor(private socket:Socket) {
    this.socket.emit("sala",'uml');
    console.log("¿y aquí entre?");
   }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message');
  }
  getRealData() {
    return this.socket.fromEvent('reciveRealData');
  }
  getGrupoADataSocket(){
    return this.socket.fromEvent('grupoA');
  }
  getGrupoBDataSocket(){
    return this.socket.fromEvent('grupoB');
  }
  accumulatedData(){
    return this.socket.fromEvent('almacenamientoDatos');
  }



}
