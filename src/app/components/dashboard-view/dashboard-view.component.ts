import { Component } from '@angular/core';
import { SocketServerService } from 'src/app/services/socket-server.service';
import { DataFetchManagerService } from 'src/app/services/data-fetch-manager.service';
import Chart from 'chart.js/auto'
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {

    /*
      arreglos que van a almacenar de la consulta a la base de datos diferentes valores coom la temperatura, los contaminantes
      */
  temperatura: any[] = []; // almacena la temperatura
  pm1DB :number[] = []; // almacena el contaminante pm 1
  pm_25 :number [] = []; // almacena el contaminante pm 2.5
  pm_10 :number[] =[]; // almacena el contaminante pm10
  horas:any[] =[]; // almacena las horas
    horaGrupoB:any;
        horaGrupoA:any;





// variables almacenan lo que manda socket.io
  respuesta :any;
  temperatureValue :any ;
  altitudeValue :any;
  airQualityValue:any ;
  pressureValue:any;
  ryValue:any;
  weatherInfo:any;
  o3value:any;
  co2value :any;
  pm1 :any;
  pm2_5:any;
  pm10:any;
  windSpeed:any;
  directionSocket:any;
  /* Variables para la lluvia */
  tds_tr:any  = 0 ;
  precipitacion_tr:any =0;
  humedad :any = 0;
  registroLluvia:any =0;


  gaugeType :any = "semi";
  gaugeValue = 28.3;
   // aquí se guarda la consulta realizada por la vista sp_view_weatherdata
   weather_dataDB :any;

  gauegeThik:any=14;
  size:any = 400;
  data :any = 15;
  arrayPrueba:any = [12, 19, 3, 5, 2, 3];

  /*
  @HostListener('window:resize',['$event'])
    onResize(){
      const screenWidth = window.innerWidth;
      console.log("Este es el jodido ancho de la pantalla",screenWidth);
      //alert("Este es el jodido ancho de la pantalla"+screenWidth);
    }
*/



constructor( private socket : SocketServerService , private data_fetch_service :  DataFetchManagerService ){

  // se le manad un mensaaje al servidor con el metodo this.socket.sendMessage
  //this.socket.sendMessage("hola servidor , te mando de regreso un beso");
  this.socket.getMessage().subscribe((msg: any) => {
         // AQUÍ se reciben los datos mandados por el servidor

    console.log("este es el mensaje que manda el servidor",msg);
   });
this.socket.getGrupoADataSocket().subscribe((message:any)=>{
    this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;
   // this.pm1 = message.pm10_env ;
   // this.pm2_5 = message.pm25;
   // this.pm10= message.pm100_env  ;
        this.ryValue =Number(  message.uv);

    this.windSpeed = message.windSpeed;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

     const ahora  =  new Date();
     this.horaGrupoA = ahora.toLocaleTimeString('es-MX',{
        hour :'2-digit',
        minute:'2-digit',
     });
this.configuracionTemperatura();
this.configuracionUV();
});
this.socket.getGrupoBDataSocket().subscribe((message:any)=>{

     this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;

    this.ryValue =Number(  message.uv);
    this.windSpeed = message.windSpeed;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

     const ahora  =  new Date();
     this.horaGrupoB = ahora.toLocaleTimeString('es-MX',{
        hour :'2-digit',
        minute:'2-digit',
     });

});

//aquí invocamos el servicio y utilizamos sus metodos para recibir los datos desde el back end en tiempo real
  this.socket.getRealData().subscribe((message: any) => {
   /*  console.log(message);
    console.log(message.temperature);
    console.log(message.pressure);
    console.log(message.altitud);
    console.log(message.air_quality);
    console.log(message.UVray); */
      console.log("esto que es ",message);
    this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;
    this.pm1 = message.pm10_env ;
    this.pm2_5 = message.pm25;
    this.pm10= message.pm100_env  ;
    this.ryValue =Number(  message.uv);
    this.windSpeed = message.windSpeed;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad =  message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

     const ahora  =  new Date();
     this.horaGrupoB = ahora.toLocaleTimeString('es-MX',{
        hour :'2-digit',
        minute:'2-digit',
     });

this.configuracionTemperatura();
this.configuracionUV();
   });

}


ngOnInit(): void {

  /* aquí estan los datos que han sido acumulados */
  this.socket.accumulatedData().subscribe((message:any) => {
    this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;
    this.ryValue =Number(  message.uv);
    this.pm1 = message.pm10_env ;
    this.pm2_5 = message.pm25;
    this.pm10= message.pm100_env;
    this.windSpeed = message.windSpeed;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad   = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

    this.configuracionTemperatura();
    this.configuracionUV();
    this.configuracionPresion(Number(this.pressureValue));
this.configuracionAltitud(Number(this.altitudeValue));

  });

this.data_fetch_service.obtenerPromedioOzono().subscribe(respuesta=>{
const data = respuesta;
this.o3value = data[0].ozono;

});
this.data_fetch_service.obtenerPromedioParticulas().subscribe(respuesta=>{
const data = respuesta;
  this.pm1 = data[0].pm1_0 ?? 0;
  this.pm2_5 = data[0].pm2_5 ?? 0;
  this.pm10 = data[0].pm10 ?? 0;
});

//este metodo obtiene los datos de la lluvia y tds, en un plazo de 24 hrs
this.data_fetch_service.obtenerRainDatos().subscribe(respuesta=>{
  const data  = respuesta;
  const precipitacion_tr = data[0].total_lluvia ?? 0;
  const tds_tr = data[0].promedio_tds ?? 0;

});


}
ngAfterViewInit():void {
  // Código para el método AfterViewInit
 this.configuracionTemperatura();
this.configuracionHumedadRelativa(Number(this.humedad));
this.configuracionPresion(Number(this.pressureValue));
this.configuracionAltitud(Number(this.altitudeValue));
}


temperaturaColor:string ="";
temperaturaDescripcion:string="";
temperaturaBgColor :string ="";
configuracionTemperatura(){
  if (this.temperatureValue<= 0 )  {
      // muy frio #0033CC
this.temperaturaColor = "#0033CC";
this.temperaturaDescripcion = "Muy frio"

  }
  else if(this.temperatureValue >0 && this.temperatureValue <=10){
// Frio #3399FF
this.temperaturaColor = "#3399FF";
this.temperaturaDescripcion = "Frio";
  }
    else if(this.temperatureValue >10 && this.temperatureValue <=20){
//Fresco #33CCCC
this.temperaturaColor = "#33CCCC";
this.temperaturaDescripcion = "Fresco";
  }
    else if(this.temperatureValue >20 && this.temperatureValue <=25){
// #2ECC71 Templada
console.log("Se supone que debe entrar aquí");
this.temperaturaColor = "#2ECC71";
this.temperaturaDescripcion = "Templado";
  } else if(this.temperatureValue >25 && this.temperatureValue <=30){
// Cálida #F1C40F
this.temperaturaColor = "#F1C40F";
this.temperaturaDescripcion = "Calido";
  }else if(this.temperatureValue >30 && this.temperatureValue <=35){
// Calurosa Calurosa
this.temperaturaColor = "#E67E22";
this.temperaturaDescripcion = "Calurosa";
  }
  else if(this.temperatureValue >35 ){
// ##E74C3C Muy calurosa
this.temperaturaColor = "#E74C3C";
this.temperaturaDescripcion = "Muy Calurosa";
  }
this.temperaturaBgColor = this.lightenColor(this.temperaturaColor ,0.75 );

}
colorHumedad:string="";
humedadBgColor:string="";

descripcionHumedad:string ="";
configuracionHumedadRelativa( humedad:number){
if (humedad <= 30) {
  this.colorHumedad="#F7DC6F";
  this.descripcionHumedad="Muy seca";
}else if(humedad > 30 && humedad <=40 ){
this.colorHumedad="#F4D03F";
  this.descripcionHumedad="Seca";
}else if(humedad > 40 && humedad <=60 ){
this.colorHumedad="#27AE60";
  this.descripcionHumedad="Confortable";
}else if(humedad > 60 && humedad <=70 ){
this.colorHumedad="#5DADE2";
  this.descripcionHumedad="Húmeda";
}else if(humedad > 70 ){
this.colorHumedad="#1F618D";
  this.descripcionHumedad="Muy húmedo";
}
this.humedadBgColor  =this.lightenColor(this.colorHumedad ,0.75 );


}
colorUv:string="";
descripcionUv:string="";
uvBgColor :string="";

configuracionUV(){

  if (this.ryValue >= 0 && this.ryValue <= 2) {
    this.colorUv = "#2ECC71";
    this.descripcionUv = "Bajo";
  }else if(this.ryValue>=3 && this.ryValue <=5){
this.colorUv = "#F1C40F";
    this.descripcionUv = "Moderado";
  }  else if(this.ryValue>=6 && this.ryValue <=7){
    this.colorUv = "#E67E22";
    this.descripcionUv = "Alto";
  }else if(this.ryValue>=8 && this.ryValue <= 10){
    this.colorUv = "#E74C3C";
    this.descripcionUv = "Muy Alto";
  }else if(this.ryValue >=11 ){
    this.colorUv = "#8E44AD";
    this.descripcionUv = "Muy Alto";
  }

  this.uvBgColor =  this.lightenColor(this.colorUv ,0.75 );

}
presionColor:string="";
presionDescripcion:string="";
presionBgColor :string ="";
configuracionPresion(presion:number){
if (presion>1020) {
  this.presionColor="#2E86C1";
  this.presionDescripcion = "Alta presión";
}else if(presion>=1010 ){
 this.presionColor="#27AE60";
  this.presionDescripcion = "Normal alta";
}else if(presion>=1000){
 this.presionColor="#F1C40F";
  this.presionDescripcion = "Normal baja";
}else if(presion>=900 && presion <1000 ){
 this.presionColor="#E67E22";
  this.presionDescripcion = "Baja presión";
}else if(presion<900){
 this.presionColor="#C0392B";
  this.presionDescripcion = "Muy baja";
}

this.presionBgColor = this.lightenColor(this.presionColor, 0.75);
}
altitudColor:string="";
altitudDescripcion:string="";
altitudBgColor:string="";
configuracionAltitud(altitud:number){
if (altitud>=0 && altitud <=500) {
  this.altitudColor = "#2ECC71";
  this.altitudDescripcion="Baja";
}else if (altitud>500 && altitud <=1500) {
this.altitudColor = "#F1C40F";
  this.altitudDescripcion="Media";
}else if (altitud>1500 && altitud <=2500) {
    this.altitudColor = "#E67E22";
  this.altitudDescripcion="Moderada";
}else if (altitud>2500 && altitud <=3500) {
  this.altitudColor = "#E74C3C";
  this.altitudDescripcion="Alta";
}else if (altitud >3500) {
  this.altitudColor = "#8E44AD";
  this.altitudDescripcion="Alta";
}
this.altitudBgColor = this.lightenColor(this.altitudColor, 0.75 );
}


/*
ozono y particulas
| Índice  | Nivel               | Color oficial |
| ------- | ------------------- | ------------- |
| 0–50    | Buena               | Verde         |
| 51–100  | Aceptable           | Amarillo      |
| 101–150 | Mala                | Naranja       |
| 151–200 | Muy mala            | Rojo          |
| >200    | Extremadamente mala | Morado        |

*/

particulas2_5Color:string="";
particulas2_5Descripcion :string="";
particulas2_5bgColor:string="";
configuracionParticulas2_5(particulas:number ){
if (particulas>200) {
   this.particulas2_5Color = "#8E44AD";
  this.particulas2_5Descripcion="Extremo Mala";
}else if ( particulas >=151) {
  this.particulas2_5Color = "#E74C3C";
  this.particulas2_5Descripcion="Muy Mala";
}else if (particulas >=101) {
    this.particulas2_5Color = "#E67E22";
  this.particulas2_5Descripcion="Mala";
}else if (particulas >=51) {
  this.particulas2_5Color= "#F1C40F";
  this.particulas2_5Descripcion="Aceptable";

}else if (particulas >=0 ) {
  this.particulas2_5Color = "#2ECC71";
  this.particulas2_5Descripcion="Buena";
}
this.particulas2_5bgColor = this.lightenColor( this.particulas2_5Color , 0.75)

}
particulasPM10Color:string="";
particulasPM10Descripcion:string="";
particulasPM10BGColor:string="";
configuracionParticulasPM10(particulas:number ){
if(particulas>200) {
   this.particulasPM10Color = "#8E44AD";
  this.particulasPM10Descripcion ="Extremo Mala";
}else if ( particulas >=151) {
 this.particulasPM10Color = "#E74C3C";
  this.particulasPM10Descripcion="Muy Mala";
}else if (particulas >=101) {
   this.particulasPM10Color  = "#E67E22";
  this.particulasPM10Descripcion ="Mala";
}else if (particulas >=51) {
  this.particulasPM10Color= "#F1C40F";
  this.particulasPM10Descripcion="Aceptable";

}else if (particulas >=0 ) {
 this.particulasPM10Color  = "#2ECC71";
  this.particulasPM10Descripcion="Buena";
}
this.particulasPM10BGColor = this.lightenColor(this.particulasPM10Color,0.75);
}



ozonoColor:string="";
ozonoDescripcion:string="";
ozonoBgColor:string="";
configuracionOzono(ozono:number ){
if(ozono>200) {
   this.ozonoColor = "#8E44AD";
  this.particulasPM10Descripcion ="Extremo Mala";
}else if ( ozono >=151) {
 this.ozonoColor = "#E74C3C";
  this.particulasPM10Descripcion="Muy Mala";
}else if (ozono >=101) {
   this.ozonoColor  = "#E67E22";
  this.particulasPM10Descripcion ="Mala";
}else if (ozono >=51) {
  this.ozonoColor= "#F1C40F";
  this.particulasPM10Descripcion="Aceptable";

}else if (ozono >=0 ) {
 this.ozonoColor  = "#2ECC71";
  this.particulasPM10Descripcion="Buena";
}
this.ozonoBgColor = this.lightenColor(this.ozonoColor,0.75);
}


/*
co2
| Rango CO₂ (ppm) | Nivel     | Descripción                                              | Color        | HEX sugerido |
| --------------- | --------- | -------------------------------------------------------- | ------------ | ------------ |
| 400 – 600       | Excelente | Aire muy limpio                                          | Verde oscuro | **#0B8F3A**  |
| 601 – 800       | Bueno     | Aire adecuado                                            | Verde medio  | **#2ECC71**  |
| 801 – 1000      | Normal    | Ventilación aceptable                                    | Verde claro  | **#A9DFBF**  |
| 1001 – 1500     | Mediocre  | Ambiente contaminado. Se recomienda ventilación.         | Naranja      | **#E67E22**  |
| > 1500          | Malo      | Ambiente altamente contaminado. Se requiere ventilación. | Rojo         | **#C0392B**  |


*/
co2Color :string="";
co2Descripcion:string="";
co2BgColor:String="";
configuracionCO2(co2:number){

if(co2>=1500){

this.co2Color="#C0392B";
this.co2Descripcion="Malo";

}else if(co2>=1001){
this.co2Color="#E67E22";
this.co2Descripcion="Mediocre";
}else if(co2>=801){
this.co2Color="#A9DFBF";
this.co2Descripcion="Normal";
}else if(co2>=601){
this.co2Color="#2ECC71";
this.co2Descripcion="Bueno";
}else if(co2>=0){
  this.co2Color="#0B8F3A";
this.co2Descripcion="Excelente";

}
this.ozonoBgColor = this.lightenColor(this.co2Color,0.75);
}

/*
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







/*


  this.data_fetch_service.obtenerweatherMeasuremnts().subscribe(respuesta=>{
    this.weather_dataDB = respuesta;
    console.log("la base de datos, respuetsa ",this.weather_dataDB);
    // Recorre los elementos y añade cada propiedad con su respectivo arreglo
    for (let i = 0; i < this.weather_dataDB.length ; i++) {

        const elemento = this.weather_dataDB[i];
        console.log("este es el chingado elemento ",elemento.pm2_5);
        this.temperatura.push(elemento.temperature);
        this.pm1DB.push(elemento.pm1_0);
        this.pm_25.push(elemento.pm2_5);
        this.pm_10.push(elemento.pm10);
        this.horas.push(elemento.hora.substring(0,2)); // se utiliza substring para extrar solo la hora de la fecha ,

    }
    console.log("estos son los datos de la temperatura",this.temperatura);
    console.log("pm1 ", this.pm1DB );
    console.log(" pm 2_5 ",this.pm_25);
    console.log(" pm 10 ",this.pm_10);
    console.log(" pm 10 ",this.horas);

   });

*/
