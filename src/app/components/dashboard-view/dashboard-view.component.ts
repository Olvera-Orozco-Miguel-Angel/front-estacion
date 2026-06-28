import { Component ,OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SocketServerService } from 'src/app/services/socket-server.service';
import { DataFetchManagerService } from 'src/app/services/data-fetch-manager.service';
import Chart from 'chart.js/auto'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard-view',
 // standalone:true,
 // imports:[RainCardComponent],
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit, AfterViewInit {

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

    this.windSpeed = Number( message.windSpeed) ?? 0.0;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

     let fecha  =  new Date(message.horaEnvioGrupoA);
      console.log("esta es la fecha --->",fecha);
     this.horaGrupoA = fecha.toLocaleString('es-MX',{

      hour :'2-digit',
        minute:'2-digit',
     });
  this.configuracionUV(Number(this.ryValue) ?? 0);
 this.configuracionTemperatura(Number(this.temperatureValue)??0);
this.configuracionPresion(Number(this.pressureValue) ?? 0);
this.configuracionAltitud(Number(this.altitudeValue)?? 0);
this.configuracionCO2(Number(this.co2value) ?? 0);

});
this.socket.getGrupoBDataSocket().subscribe((message:any)=>{

     this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;

    this.ryValue =Number(  message.uv);
    this.windSpeed = Number( message.windSpeed) ?? 0.0;
    this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

    let fecha  =  new Date(message.horaEnvioGrupoB);
     this.horaGrupoB = fecha.toLocaleString('es-MX',{
        hour :'2-digit',
        minute:'2-digit',
     });
  this.configuracionLluvia(Number(this.precipitacion_tr) ?? 0);
this.configuracionHumedadRelativa(Number(this.humedad)?? 0);

this.configuracionOzono(Number(this.o3value ));


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

    let fecha  =  new Date(message.horaEnvioGrupoB);
          console.log("esta es la fecha --->",message.horaEnvioGrupoB);
     this.horaGrupoB = fecha.toLocaleString('es-MX',{
        hour :'2-digit',
        minute:'2-digit',
     });

   });

}


ngOnInit(): void {

  /* aquí estan los datos que han sido acumulados */
  this.socket.accumulatedData().subscribe((message:any) => {
    this.temperatureValue = Number( message.temperature);
    this.pressureValue = message.pressure;
    this.altitudeValue = message.altitud;
    this.ryValue =Number(  message.uv);
   // this.pm1 = message.pm10_env ;
   // this.pm2_5 = message.pm25;
   // this.pm10= message.pm100_env;
    this.windSpeed = message.windSpeed;
    console.log("Esta es la velocidad del viento  --->",this.windSpeed)
    //this.o3value = message.ozono;
    this.co2value = message.co2;
    this.directionSocket = message.direction;
    this.humedad   = message.humedad;
    this.tds_tr  = message.tds;
    this.precipitacion_tr =message.lm2;
    this.registroLluvia = message.ultimoRegistroHora;

    console.log(message.horaEnvioGrupoB ?? "nada papito");



  this.configuracionTemperatura(Number(this.temperatureValue) ?? 0);
this.configuracionHumedadRelativa(Number(this.humedad));
this.configuracionPresion(Number(this.pressureValue)?? 0);
this.configuracionAltitud(Number(this.altitudeValue));
this.configuracionOzono(Number(this.o3value ));
this.configuracionParticulas2_5(Number(this.pm2_5));
this.configuracionParticulasPM10(Number(this.pm10));
this.configuracionCO2(Number(this.co2value));
  this.configuracionLluvia(Number(this.precipitacion_tr));
  this.configuracionUV(Number(this.ryValue)?? 0);


  });

this.data_fetch_service.obtenerPromedioOzono().subscribe(respuesta=>{
const data = respuesta;
this.o3value = data[0].ozono ?? 0;
this.configuracionOzono(Number(this.o3value ));

});
this.data_fetch_service.obtenerPromedioParticulas().subscribe(respuesta=>{
const data = respuesta;
  this.pm1 = data[0].pm1_0 ?? 0;
  this.pm2_5 = data[0].pm2_5 ?? 0;
  this.pm10 = data[0].pm10 ?? 0;

  console.log("pm25",this.pm2_5);
    console.log("pm 10 ",this.pm10);

  this.configuracionParticulas2_5(Number(this.pm2_5) ?? 0);
this.configuracionParticulasPM10(Number(this.pm10) ?? 0 );
});

//este metodo obtiene los datos de la lluvia y tds, en un plazo de 24 hrs
this.data_fetch_service.obtenerRainDatos().subscribe(respuesta=>{
  const data  = respuesta;
  const precipitacion_tr = data[0].total_lluvia ?? 0;
  const tds_tr = data[0].promedio_tds ?? 0;
  this.configuracionLluvia(Number(this.precipitacion_tr));
  this.configuracionTds(Number(this.tds_tr));
});


}



ngAfterViewInit():void {

  // Código para el método AfterViewInit
  this.configuracionUV(Number(this.ryValue) ?? 0);
 this.configuracionTemperatura(Number(this.temperatureValue)??0);
this.configuracionPresion(Number(this.pressureValue) ?? 0);
this.configuracionAltitud(Number(this.altitudeValue)?? 0);
this.configuracionCO2(Number(this.co2value) ?? 0);

//this.configuracionOzono(Number(this.o3value ));
//this.configuracionParticulas2_5(Number(this.pm2_5));
//this.configuracionParticulasPM10(Number(this.pm10) );
  this.configuracionLluvia(Number(this.precipitacion_tr) ?? 0);
 // this.configuracionVelocidadViento(Number(this.windSpeed) ?? 0);
this.configuracionHumedadRelativa(Number(this.humedad)?? 0);

}


temperaturaColor:string ="";
temperaturaDescripcion:string="";
temperaturaBgColor :string ="";
configuracionTemperatura(temperatura:number){
  if (temperatura <= 0 )  {
      // muy frio #0033CC
this.temperaturaColor = "#0033CC";
this.temperaturaDescripcion = "Muy frio"

  }
  else if(temperatura >0 && temperatura <=10){
// Frio #3399FF
this.temperaturaColor = "#3399FF";
this.temperaturaDescripcion = "Frio";
  }
    else if(temperatura >10 && temperatura <=20){
//Fresco #33CCCC
this.temperaturaColor = "#33CCCC";
this.temperaturaDescripcion = "Fresco";
  }
    else if(temperatura >20 && temperatura <=25){
// #2ECC71 Templada
console.log("Se supone que debe entrar aquí");
this.temperaturaColor = "#2ECC71";
this.temperaturaDescripcion = "Templado";
  } else if(temperatura >25 && temperatura<=30){
// Cálida #F1C40F
this.temperaturaColor = "#F1C40F";
this.temperaturaDescripcion = "Calido";
  }else if(temperatura >30 && temperatura <=35){
// Calurosa Calurosa
this.temperaturaColor = "#E67E22";
this.temperaturaDescripcion = "Calurosa";
  }
  else if(temperatura >35 ){
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

configuracionUV(rayos:number){

  if (rayos >= 0 && rayos <= 2) {
    this.colorUv = "#2ECC71";
    this.descripcionUv = "Bajo";
  }else if(rayos>=3 && rayos <=5){
this.colorUv = "#F1C40F";
    this.descripcionUv = "Moderado";
  }  else if(rayos >=6 && rayos <=7){
    this.colorUv = "#E67E22";
    this.descripcionUv = "Alto";
  }else if(rayos >=8 && rayos<= 10){
    this.colorUv = "#E74C3C";
    this.descripcionUv = "Muy Alto";
  }else if(rayos >=11 ){
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
| Calidad del aire    | Nivel de riesgo asociado | Al entrar en vigor la NOM (µg/m³) | A partir del 27 dic 2023 (µg/m³) | A partir del 27 dic 2025 (µg/m³) |
| ------------------- | ------------------------ | --------------------------------- | -------------------------------- | -------------------------------- |
| Buena               | Bajo                     | ≤ 15                              | ≤ 15                             | ≤ 15                             |
| Aceptable           | Moderado                 | >15 y ≤41                         | >15 y ≤33                        | >15 y ≤25                        |
| Mala                | Alto                     | >41 y ≤79                         | >33 y ≤79                        | >25 y ≤79                        |
| Muy Mala            | Muy Alto                 | >79 y ≤130                        | >79 y ≤130                       | >79 y ≤130                       |
| Extremadamente Mala | Extremadamente Alto      | >130                              | >130                             | >130                             |


*/

particulas2_5Color:string="";
particulas2_5Descripcion :string="";
particulas2_5bgColor:string="";
configuracionParticulas2_5(particulas:number ){
if (particulas>130) {
   this.particulas2_5Color = "#8E44AD";
  this.particulas2_5Descripcion="Extremo Alto";
}else if ( particulas >79) {
  this.particulas2_5Color = "#E74C3C";
  this.particulas2_5Descripcion="Muy Alto";
}else if (particulas >25) {
    this.particulas2_5Color = "#E67E22";
  this.particulas2_5Descripcion="Alto";
}else if (particulas >15) {
  this.particulas2_5Color= "#F1C40F";
  this.particulas2_5Descripcion="Moderado";

}else if (particulas <=15 ) {
  this.particulas2_5Color = "#2ECC71";
  this.particulas2_5Descripcion="Bajo";
}
this.particulas2_5bgColor = this.lightenColor( this.particulas2_5Color , 0.75)

}

/*
PM10
| Calidad del aire    | Nivel de riesgo asociado | Al entrar en vigor la NOM (µg/m³) | A partir del 27 dic 2023 (µg/m³) | A partir del 27 dic 2025 (µg/m³) |
| ------------------- | ------------------------ | --------------------------------- | -------------------------------- | -------------------------------- |
| Buena               | Bajo                     | ≤ 45                              | ≤ 45                             | ≤ 45                             |
| Aceptable           | Moderado                 | >45 y ≤70                         | >45 y ≤60                        | >45 y ≤50                        |
| Mala                | Alto                     | >70 y ≤132                        | >60 y ≤132                       | >50 y ≤132                       |
| Muy Mala            | Muy Alto                 | >132 y ≤213                       | >132 y ≤213                      | >132 y ≤213                      |
| Extremadamente Mala | Extremadamente Alto      | >213                              | >213                             | >213                             |

*/
particulasPM10Color:string="";
particulasPM10Descripcion:string="";
particulasPM10BGColor:string="";
configuracionParticulasPM10(particulas:number ){
if(particulas>213) {
   this.particulasPM10Color = "#8E44AD";
  this.particulasPM10Descripcion ="Extremo Alto";
}else if ( particulas >132) {
 this.particulasPM10Color = "#E74C3C";
  this.particulasPM10Descripcion="Muy Alto";
}else if (particulas >50) {
   this.particulasPM10Color  = "#E67E22";
  this.particulasPM10Descripcion ="Alto";
}else if (particulas >45) {
  this.particulasPM10Color= "#F1C40F";
  this.particulasPM10Descripcion="Moderado";

}else if (particulas <= 45 ) {
 this.particulasPM10Color  = "#2ECC71";
  this.particulasPM10Descripcion="Bajo";
}
this.particulasPM10BGColor = this.lightenColor(this.particulasPM10Color,0.75);
}


/*
| Calidad del aire    | Nivel de riesgo asociado | Intervalo de ozono (O₃) promedio de una hora (ppm) |
| ------------------- | ------------------------ | -------------------------------------------------- |
| Buena               | Bajo                     | ≤ 0.035                                            |
| Aceptable           | Moderado                 | > 0.035 y ≤ 0.090                                  |
| Mala                | Alto                     | > 0.090 y ≤ 0.130                                  |
| Muy Mala            | Muy Alto                 | > 0.130 y ≤ 0.175                                  |
| Extremadamente Mala | Extremadamente Alto      | > 0.175                                            |

https://www.diariooficial.gob.mx/normasOficiales/9314/semarnat_1_C/semarnat_1_C.html

*/


ozonoColor:string="";
ozonoDescripcion:string="";
ozonoBgColor:string="";
configuracionOzono(ozono:number ){
if(ozono>0.175) {
   this.ozonoColor = "#8E44AD";
  this.ozonoDescripcion ="Extremo Alto";
}else if ( ozono >0.130) {
 this.ozonoColor = "#E74C3C";
  this.ozonoDescripcion="Muy Alto";
}else if (ozono >0.090) {
   this.ozonoColor  = "#E67E22";
  this.ozonoDescripcion ="Alto";
}else if (ozono > 0.035) {
  this.ozonoColor= "#F1C40F";
  this.ozonoDescripcion ="Moderado";

}else if (ozono <= 0.035 ) {
 this.ozonoColor  = "#2ECC71";
  this.ozonoDescripcion="Bajo";
}
this.ozonoBgColor = this.lightenColor(this.ozonoColor,0.75);
}


/*
nota:
el co2 no cuenta con alguna norma sobre los indices de calidad
referencia web https://www.integratecnologia.es/la-innovacion-necesaria/co2-care-la-solucion-iot-para-controlar-la-calidad-del-aire/
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

if(co2>2100){

this.co2Color="#C0392B";
this.co2Descripcion="Muy Malo";

}else if(co2>1600){
this.co2Color="#E67E22";
this.co2Descripcion="Malo";
}else if(co2>=1100){
this.co2Color="#A9DFBF";
this.co2Descripcion="Normal";
}else if(co2>=700){
this.co2Color="#2ECC71";
this.co2Descripcion="Bueno";
}else if(co2 >=400 || co2 <400 ){
this.co2Color="#0B8F3A";
this.co2Descripcion="Excelente";

}
this.co2BgColor = this.lightenColor(this.co2Color,0.75);
}


/*


| Acumulado 24h | Clasificación | Color       | HEX         |
| ------------- | ------------- | ----------- | ----------- |
| 0             | Sin lluvia    | Gris claro  | **#D5D8DC** |
| 1 – 10        | Ligera        | Azul claro  | **#5DADE2** |
| 10 – 30       | Moderada      | Azul        | **#2E86C1** |
| 30 – 60       | Fuerte        | Azul oscuro | **#1B4F72** |
| > 60          | Muy fuerte    | Morado      | **#4A235A** |
*/

lluviaColor :string="";
lluviaDescripcion:string="";
lluviaBgColor:string="";

configuracionLluvia(precipitacion:number){
  if (precipitacion>60) {
this.lluviaColor = "#4A235A";
this.lluviaDescripcion ="Muy fuerte" ;
  }else if (precipitacion >30  ) {
this.lluviaColor = "#1B4F72";
this.lluviaDescripcion ="Fuerte" ;
  } else  if(precipitacion>10){
    this.lluviaColor = "#2E86C1";
this.lluviaDescripcion ="Moderada" ;
  }
  else  if(precipitacion>1){
    this.lluviaColor = "#5DADE2";
this.lluviaDescripcion ="Ligera" ;
  }
    else  if(precipitacion ==0){
    this.lluviaColor = "#D5D8DC";
this.lluviaDescripcion ="Sin lluvia" ;
  }
this.lluviaBgColor = this.lightenColor(this.lluviaColor,0.75);

}



/*
https://www.carbotecnia.info/aprendizaje/quimica-del-agua/solidos-disueltos-totales-tds/
| TDS (ppm o mg/L) | Nivel                         | Interpretación               | Color        | HEX         |
| ---------------- | ----------------------------- | ---------------------------- | ------------ | ----------- |
| 0 – 300          | Excelente                     | Agua muy pura                | Verde oscuro | **#0B8F3A** |
| 301 – 600        | Nivel bueno                   | Buena calidad                | Verde        | **#27AE60** |
| 601 – 900        | Nivel aceptable               | Aún consumible               | Amarillo     | **#F1C40F** |
| 901 – 1200       | Nivel pobre / no recomendable | Alta concentración de sales  | Naranja      | **#E67E22** |
| > 1200           | Inaceptable                   | No recomendable para consumo | Rojo         | **#C0392B** |

*/
tdsColor :string="";
tdsDescripcion:string="";
tdsBgColor:string="";
configuracionTds(tds:number){
 if(isNaN(tds) ){
  console.warn("TDS inválido, checar arduinos o sensor",tds);
  this.tdsColor= "#BDC3C7";
  this.tdsDescripcion= "Sin dato";
  this.tdsBgColor = this.lightenColor(this.tdsColor, 0.75);
return ;
  }
if(tds >1200){
  this.tdsColor ="#C0392B";
  this.tdsDescripcion ="Inaceptable";
}
else if(tds >=901){

    this.tdsColor ="#E67E22";
  this.tdsDescripcion ="Poco Aceptable";

}
else if(tds >=601){
  this.tdsColor ="#F1C40F";
  this.tdsDescripcion ="Aceptable";
}
else if(tds >=301){
  this.tdsColor ="#27AE60";
  this.tdsDescripcion ="Bueno";
}
else if(tds >=0){

   this.tdsColor ="#0B8F3A";
  this.tdsDescripcion ="Excelente";
}
else{
     this.tdsColor ="#BDC3C7";
  this.tdsDescripcion ="?";
}
  this.tdsBgColor = this.lightenColor(this.tdsColor, 0.75);

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
