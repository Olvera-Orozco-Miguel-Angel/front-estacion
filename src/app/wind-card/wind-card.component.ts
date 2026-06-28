import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-wind-card',
  templateUrl: './wind-card.component.html',
  styleUrls: ['./wind-card.component.css']
})
export class WindCardComponent {
private _grados :number = 0;
private _speed :number=0;
direccion :string = "";
  catalogoDirecciones : string[]= [
  "Norte","NNE","Noreste","ENE",
  "Este","ESE","Sureste","SSE",
  "Sur","SSO","Suroeste","OSO",
  "Oeste","ONO","Noroeste","NNO"
]
@Input() update :any // esta variable almacena la fecha en la que fue mandada el ultimo valor del viento
@Input()
set speed(speed:number){
  this._speed = speed
  this.configuracionVelocidadViento(speed)
}
get speed():number{
return this._speed
}


  @Input()
  set grados(grados:number){
      this.convertirGradosADireccionViento(grados)
  }

  convertirGradosADireccionViento(grados:number){
    var resultado = Math.round( grados/22.5 ) % 16
    this.direccion = this.catalogoDirecciones[resultado]

  }
/*
se aplican estilos y se clasifica la velocidad del viento con base a la siguiente tabla

| Beaufort | Velocidad (km/h) | Clasificación     | Color sugerido | HEX     |
| -------- | ---------------- | ----------------- | -------------- | ------- |
| 0        | < 1              | Calma             | Verde oscuro   | #1E8449 |
| 1        | 1 – 5            | Ventolina         | Verde          | #27AE60 |
| 2        | 6 – 11           | Brisa ligera      | Verde claro    | #82E0AA |
| 3        | 12 – 19          | Brisa suave       | Amarillo claro | #F7DC6F |
| 4        | 20 – 28          | Brisa moderada    | Amarillo       | #F1C40F |
| 5        | 29 – 38          | Brisa fresca      | Naranja claro  | #F39C12 |
| 6        | 39 – 49          | Viento fuerte     | Naranja        | #E67E22 |
| 7        | 50 – 61          | Viento muy fuerte | Rojo claro     | #EC7063 |
| 8        | 62 – 74          | Temporal          | Rojo           | #E74C3C |
| 9        | 75 – 88          | Temporal fuerte   | Rojo intenso   | #C0392B |
| 10       | 89 – 102         | Temporal duro     | Morado claro   | #AF7AC5 |
| 11       | 103 – 117        | Tormenta violenta | Morado         | #8E44AD |
| 12       | ≥ 118            | Huracán           | Morado oscuro  | #5B2C6F |

*/
velocidaVientoColor :string="";
 velocidadVientoDescripcion:string="";
velocidadVientoBgColor:string="";

configuracionVelocidadViento(velocidad:number){
  if(isNaN(velocidad) ){
    console.warn("Velocidad del viento inválida, checar arduinos",velocidad);
this.velocidaVientoColor= "#D5D8DC";
this.velocidadVientoDescripcion= "Sin dato";
  this.velocidadVientoBgColor = this.lightenColor(this.velocidaVientoColor, 0.75);

return ;
  }


    if (velocidad >= 118 ) {
    this.velocidaVientoColor = "#5B2C6F";
    this.velocidadVientoDescripcion ="Huracán";

  }else if ( velocidad >= 103 ) {
 this.velocidaVientoColor = "#8E44AD";
    this.velocidadVientoDescripcion ="Tormenta violenta";
  }else if ( velocidad >= 89 ) {
 this.velocidaVientoColor = "#AF7AC5";
    this.velocidadVientoDescripcion ="Temporal duro";
  }else if ( velocidad >= 75 ) {
 this.velocidaVientoColor = "#C0392B";
    this.velocidadVientoDescripcion ="Temporal fuerte";
  }

  else if ( velocidad >= 62 ) {
 this.velocidaVientoColor = "#E74C3C";
    this.velocidadVientoDescripcion ="Temporal";
  }
  else if ( velocidad >= 50 ) {
 this.velocidaVientoColor = "#EC7063";
    this.velocidadVientoDescripcion ="Viento muy fuerte";
  }
   else if ( velocidad >= 39 ) {
 this.velocidaVientoColor = "#E67E22";
    this.velocidadVientoDescripcion ="Viento fuerte";
  }
  else if ( velocidad >= 29 ) {
 this.velocidaVientoColor = "#F39C12";
    this.velocidadVientoDescripcion ="Brisa fresca";
  }

   else if ( velocidad >= 20 ) {
 this.velocidaVientoColor = "#F1C40F";
    this.velocidadVientoDescripcion ="Brisa moderada";
  }
  else if ( velocidad >= 12 ) {
 this.velocidaVientoColor = "#F7DC6F";
    this.velocidadVientoDescripcion ="Brisa suave";
  } else if ( velocidad >= 6 ) {
 this.velocidaVientoColor = "#82E0AA";
    this.velocidadVientoDescripcion ="Brisa ligera";
  }
  else if ( velocidad >= 1 ) {
 this.velocidaVientoColor = "#27AE60";
    this.velocidadVientoDescripcion ="Ventolina";
  }
  else if ( velocidad <1 ) {
 this.velocidaVientoColor = "#1E8449 ";
    this.velocidadVientoDescripcion ="Calma";
  }
  this.velocidadVientoBgColor = this.lightenColor(this.velocidaVientoColor, 0.75);
}
lightenColor(hex:string,percent:number):string{
  //quitar #
  hex = hex.replace('#','');
  //convertir a rgb
  let r = parseInt(hex.substring(0,2),16);
  let g = parseInt(hex.substring(2,4),16);
  let b = parseInt(hex.substring(4,6),16);
// aclarar cada canal
r = Math.min(255,Math.floor(r+(255-r ) *percent));
g = Math.min(255,Math.floor(g+(255 -g ) *percent));
b =  Math.min(255,Math.floor(b+(255 -b ) *percent));
// convertir de nuevo a hex
const toHex= (value:number)=> value.toString(16).padStart(2,'0');
return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}









}
