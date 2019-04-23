import {
    Controller,
    Get,
    HttpCode,
    Post,
    Put,
    Delete,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response
} from '@nestjs/common';
import {AppService} from './app.service';

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
        const numeroRandomico = Math.round(Math.random() * 10);
        console.log('Numero: ', numeroRandomico);
        const numeroDeCabecera = Number(headers.numero);

        if (numeroDeCabecera == numeroRandomico) {
            return 'Ok';
        } else {
            return ':(';
        }


    }

    // ?llave=valor&llave2=valor2
    @Post('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'Buenas tardes';
        }
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response
    ) {
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Fanesca');
            }
            return response.send({mensaje: 'Registro Creado'});
        } else {
            return response.status(400)
                .send({
                    mensaje: 'ERROR, no envia nombre o cantidad',
                    error: 400
                });
        }

    }

    @Get('/semilla')
    semilla(@Request() request){
        console.log(request.cookies);
        const cookies = request.cookies;
        if(cookies.micookie){
            return 'ok'
        }else{
            return ':('
        }

    }

    @HttpCode(200)
    @Get('/suma')
    suma(@Headers() headers){
        return String(Number(headers.numero1)+Number(headers.numero2));
    }
    @HttpCode(201)
    @Post('/resta')
    resta(@Body() body){
        return String(Number(body.numero1)-Number(body.numero2));
    }
    @HttpCode(202)
    @Put('/multiplicacion')
    multiplicacion(@Query() query){
        return String(Number(query.numero1)*Number(query.numero2));
    }
    @HttpCode(203)
    @Delete('/division')
    division(@Headers() headers, @Body() body, @Query() query){
        if(Number(headers.numero2)==0 || Number(body.numero2)==0 || Number(query.numero2)==0)
            return 'division entre 0';
        else{
            return String(Number(headers.numero1)/Number(headers.numero2)) + '\n' +
                String(Number(body.numero1)/Number(body.numero2)) + '\n' +
                String(Number(query.numero1)/Number(query.numero2));
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
                "nombre": "cachetes"
            },
        ],
    },
];

// JS -> JSON

let adrian = 'Adrian';

// TS

let vicente: any = 'Vicente';
vicente = 1;

let objeto: any = {
    propiedad: 'valor',
    propiedadDos: 'valor2'
};
objeto.propiedad  // valor
objeto.propiedadDos  // valor2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; // -> destruir
objeto.propiedadTres = undefined; // -> destruir


