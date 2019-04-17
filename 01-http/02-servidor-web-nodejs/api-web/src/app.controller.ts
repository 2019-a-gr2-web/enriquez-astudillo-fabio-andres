import {Controller, Get, HttpCode, Post, Put, Delete, Headers, Param, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {Body} from "@nestjs/common/decorators/http/route-params.decorator";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();

// http://192.168.1.10:3000/segmentoInicial/segmentoAccion
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/borrar
// @Controller(segmentoInicial)
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  // @Controller(segmentoAccion)
  @Get('/hello-world')  // METODO HTTP
  helloWorld(): string {
    return 'Hello world';
  }

  // POST http://localhost:3000/api
  @Post('/hola-mundo')  // METODO HTTP
  holaMundo() {
    return 'Hola mundo';
  }

  @Get('/ciudad/:idCiudad')
  ciudad(@Param() parametrosRuta){
    switch(parametrosRuta.idCiudad.toLowerCase()) {
      case 'quito':
        return 'que fuef';
      case 'guayaquil':
        return 'Que ma ñañosh';
      default:
        return 'Buenas Tardes';
    }
  }

  @Post('/registroComida')
  registroComida(
      @Body() parametrosCuerpo,
      @Response() response

  ){
    if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
      const cantidad = Number(parametrosCuerpo.cantidad);
      if(cantidad > 1){
        response.set('Premio','Fanesca');
      }
      return response.send({mensaje:'Registro Creado'})
    }else{
      return response.status(400)
          .send({
            mensaje:'Error: no envía nombre o cantidad',
            error:400
          });
    }
  }

  @Get('/semilla')
  semilla(@Request() request) {
    console.log(request.cookies);
    const cookies = request.cookies;
    if (cookies.micookie) {
      return 'ok'
    } else {
      return ':('
    }
  }

  @Put('/salut-monde')  // METODO HTTP
  salutMonde() {
    return 'Salut monde';
  }

  @Delete('/ola-mundo')  // METODO HTTP
  olaMundo() {
    return 'Olá mundo';
  }



  @Get('/adivina')  // METODO HTTP
  adivina(@Headers() headers): string {
    console.log('Headers: ', headers);
    const numeroRandomico =  Math.round(Math.random()*10);
    const numeroDeCabecera = Number(headers.numero);

    if( numeroDeCabecera == numeroRandomico){
      return 'Ok';
    }else{
      return ':(';
    }


  }


  // js -> ts






  /*
  const nombre: string = 'Adrian'; // string
  const edad = 29;  // number
  const sueldo = 1.20;  // number
  const casado = false;  // boolean
  const hijos = null;  // null
  const alas = undefined;  // undefined
  */


  /*
  * Segmento inicial: /api
  * 1) Segmento Accion: GET 'hello-world' -> 'Hello world'
  * 2) Segmento Accion: POST 'hola-mundo' -> 'Hola mundo'
  * 3) Segmento Accion: PUT '...' -> '....'
  * 4) Segmento Accion: DELETE '..' -> '....'
  * */


}


/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/

const json = [
  {
    llave: 'valor',
    "key": "value",
    'nombre': "Adrian\"\"",
    edad: 29,
    sueldo: 10.21,
    casado: false,
    hijos: null,
    mascotas: [
      "cachetes",
      1,
      1.01,
      false,
      null,
      {
        "nombre":"cachetes"
      },
    ],
  },
];

// JS -> JSON

let adrian = 'Adrian';

// TS

let vicente:any = 'Vicente';
vicente = 1;

let objeto:any = {
  propiedad:'valor',
  propiedadDos:'valor2'
};
objeto.propiedad  // valor
objeto.propiedadDos  // valor2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; // -> destruir
objeto.propiedadTres = undefined; // -> destruir
