import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-gauge-card',
  templateUrl: './gauge-card.component.html',
  styleUrls: ['./gauge-card.component.css']
})
export class GaugeCardComponent {
  @Input() title: string = '';
  @Input() icono: string='';
  @Input() update:string='';
  @Input() append:string='';
  @Input() indice:string='';
  @Input() value:number=0;
  @Input() foreGround:string='';
  @Input() backGround:string='';
  @Input() maxNumber:String='';


}
