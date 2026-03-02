import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-gauge-card',
  templateUrl: './gauge-card.component.html',
  styleUrls: ['./gauge-card.component.css']
})
export class GaugeCardComponent {

  @Input() title: string = '';
  @Input() icon: string='';
  @Input() update:any; // esta variable almacena la fecha en la que se envio el dato desde el servidor
  @Input() append:string=''; //almacena por ejemplo %, C°,  msn , etc
  @Input() index:string=''; // muestra al usuario el nivel en el que se encuentra el valor, ejemplo  alto, medio, bajo
  @Input() value:number=0; // valor obtenido por el  sensor
  @Input() foreGround:string='';
  @Input() backGround:string='';
  @Input() maxNumber:number=0;

}
