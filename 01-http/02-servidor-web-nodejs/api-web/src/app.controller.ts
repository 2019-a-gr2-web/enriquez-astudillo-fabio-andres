
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
    Response,
    Session, 
    Res,
    Render,
    UseInterceptors,
    UploadedFile,
    UploadedFiles
} from '@nestjs/common';
import {AppService} from './app.service';


import * as Joi from '@hapi/joi';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

// const Joi = require('@hapi/joi');


// http://192.168.1.10:3000/segmentoInicial/segmentoAccion
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/borrar
// @Controller(segmentoInicial)

@Controller('/api')
export class AppController {

    arregloUsuarios = [];

    constructor(private readonly appService: AppService) {
    }

    
    @Get('inicio')
    helloWorld(@Response() res): string {
        return res.render('inicio',
            {
                estaVivo:true
            }
        );
    }

    @Get('peliculas')
    peliculas(@Response() res): string {
        return res.render('peliculas/inicio.ejs',
            {
                estaVivo:true
            }
        );
    }

    @Get('estilos')
    estilos(@Response() res): string {
        return res.render('peliculas/estilos');
    }
    
    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        session.autenticado=true;
        session.nombreUsuario = nombre;
        console.log(session);
        return 'ok';
    }

    @Get('login')
    loginVista(@Res() res){
        res.render('login');
    }

    @Post('login')
    login(
        @Body() usuario,
        @Res() res,
        @Session() session
    ){
        if(usuario.username === 'Fabio' && usuario.password === '12345678'){
            session.username = usuario.username;
            res.redirect('/api/protegida')
        }else{
            res.status(400)
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/login');
        }
    }

    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
    }

    @Get('subirArchivo/:idTrago')
    @Render('archivo')
    subirArchivo(
        @Res() res,
        @Param('idTrago') idTrago
    ) {
        return{
            idTrago: idTrago
        };
    }

    @Post('subirArchivo/:idTrago')
    @UseInterceptors(
        FilesInterceptor(
            'imagen',2,
            {
                dest: __dirname + '/../archivos'
            }
        )
    )
    subirArchivoPost(
        @Param('idTrago') idTrago,
        @UploadedFiles() archivo
    ){
        console.log(archivo);
        return { mensaje: 'ok' };
    }

    @Get('descargarArchivo/:idTrago')
    descargarArchivo(
        @Res() res,
        @Param('idTrago') idTrago
    ){
        const originalnamae = 'Mario.jpg';
        const path = 'C:\\Users\\fabio_4ao98x3\\Documents\\GitHub\\enriquez-astudillo-fabio-andres\\01-http\\02-servidor-web-nodejs\\api-web\\archivos\\9d17b2278eedaef8fc8a6b50ee7a4ec2'
        res.download(path, originalnamae);
    }
    
}




/*

// 1) Impriman en consola todos los elementos

const arregloNumerosForEach = [1, 2, 3, 4, 5, 6];

const rForEach = arregloNumerosForEach
    .forEach(
        function (valorActual) {
            console.log(`Valor: ${valorActual}`);
        }
    );


const r2ForEach = arregloNumerosForEach
    .forEach(n => console.log(`${n}`));


console.log(`RESPUESTA FOREACH: ${rForEach}`);

// 2) Sumen 2 a los pares y 1 a los impares

const arregloNumerosMap = [1, 2, 3, 4, 5, 6];

const rMap = arregloNumerosMap
    .map(  // Devolver el nuevo VALOR de ese elemento
        (valorActual) => {
            const esPar = valorActual % 2 == 0;
            if (esPar) {
                const nuevoValor = valorActual + 2;
                return nuevoValor;
            } else {
                const nuevoValor = valorActual + 1;
                return nuevoValor;
            }
        }
    );

console.log(`RESPUESTA MAP: ${rMap}`); // Nuevo Arreglo

// 3) Encuentren si hay el numero 4

const arregloNumerosFind = [1, 2, 3, 4, 5, 6];

const rFind = arregloNumerosFind
    .find( // CONDICION para devolver ese ELEMENTO
        (valorActual)=>{
            return valorActual == 4;
        }
    );
console.log(`Respuesta FIND: ${rFind}`);

// 4) Filtren los numeros menores a 5


const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];

const rFilter = arregloNumerosFilter
    .filter(  // CONDICION TRUE  -> Agrega al arreglo
        //       CONDICION FALSA -> Se omite del arreglo
        (valorActual)=>{
            return valorActual < 5;
        }
    );
console.log(`Respuesta FILTER: ${rFilter}`);
 
// 5) TODOS los valores positivos

const arregloNumerosEvery = [1, 2, 3, 4, 5, 6];

const respuestaEvery = arregloNumerosEvery // AND
        .every(  //si TODOS cumplen TRUE
                 //si ALGUNO no cumple FALSE
            (valorActual)=>{
                return valorActual > 0
            }
        );

// 6) ALGUN valor es menor que 2

const arregloNumerosSome = [1, 2, 3, 4, 5, 6];

const respuestaSome = arregloNumerosEvery // AND
        .some(  //si TODOS cumplen TRUE
                 //si ALGUNO no cumple FALSE
            (valorActual)=>{
                return valorActual > 0
            }
        );


// 7) Sumen todos los valores

const valorDondeEmpiezaCalculo = 0;
const arregloNumerosReduce = [1, 2, 3, 4, 5, 6];

arregloNumerosReduce.
            reduce(
                (acumulado, valorActual) =>{
                    return acumulado + valorActual;
                },
                valorDondeEmpiezaCalculo
            );

// 8) Restar todos los valores de 100

const valorFinalCalculo = 100;
const arregloNumerosReduceResta = [1, 2, 3, 4, 5, 6];

const resCien = arregloNumerosReduceResta.
            reduce(
                (acumulado, valorActual) =>{
                    return acumulado - valorActual;
                },
                valorFinalCalculo
            );

console.log(resCien);

// < 4 --> 10% + 5 || >= 4 --> 15% + 3

const arregloNumeros = [1,2,3,4,5,6]
const valorInicial = 0;

const ejercicio = arregloNumeros.reduce(
    (acumulado, valorActual) =>{
        if(valorActual < 4)
            return acumulado + valorActual*1.1 + 5
        else
            return acumulado + valorActual*1.15 + 3
        
    },
    valorInicial
    
);
console.log(`Respuesta: ${ejercicio}`);


// 1.1) Sumen 10 a todos
// 1.2) Filtren a los mayores a 15
// 1.3) Si hay algun numero mayor a 30

const arregloEj = [1,2,3,4,5,6]

arregloEj
    .map(
        (valorActual)=>{
            return valorActual + 10;
        }
    ).filter(
        (valorActual)=> {
            return valorActual > 15;
        }
    ).some(
        (valorActual)=>{
            return valorActual > 30;
        }
    );
















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
    semilla(
        @Request() request,
        @Response() response
    ) {
        console.log(request.cookies);
        const cookies = request.cookies; // JSON

        const esquemaValidacionNumero = Joi
            .object()
            .keys({
                numero: Joi.number().integer().required()
            });

        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado);
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura', cookieSegura);
        } else {
            console.log('No es valida esta cookie');
        }

        if (cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',      // NOMBRE (key)
                new Date().getTime(),  // VALOR  (value)
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                }
            );

            return response.send('ok');
        } else {
            return response.send(':(');
        }

    } */


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

/* const json = [
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


// Variables ? const, var, let
// string, number, boolean

function holaMundo() {
    console.log('Hola mundo');
}

const respuestaHolaMundo = holaMundo(); // undefined
console.log('Resp hola mundo: ', respuestaHolaMundo);

function suma(a: number, b: number): number {
    return a + b;
}

const respuestaSuma = suma(2, 3); // 3
console.log('Resp suma: ', respuestaSuma);

// Condicionales

// Truty -> true
// Falsy -> false

if (true) { // Truty
    console.log('Verdadero');
} else {
    console.log('Falso');
}

if (false) { // Falsy
    console.log('Verdadero');
} else {
    console.log('Falso');
}

if ("") { //  Falsy
    console.log('Verdadero "" ');
} else {
    console.log('Falso "" ');
}

if ("a") { // Truty
    console.log('Verdadero "a" ');
} else {
    console.log('Falso "a" ');
}

if (0) { // Falsy
    console.log('Verdadero "0" ');
} else {
    console.log('Falso "0" ');
}

if ("0") { // Truty
    console.log('Verdadero "0" ');
} else {
    console.log('Falso "0" ');
}

if (-1) { // Truty
    console.log('Verdadero "-1" ');
} else {
    console.log('Falso "-1" ');
}

if (1) { // Truty
    console.log('Verdadero "1" ');
} else {
    console.log('Falso "1" ');
}


if (undefined) { //  Falsy
    console.log('Verdadero "undefined" ');
} else {
    console.log('Falso "undefined" ');
}

if (null) { //  Falsy
    console.log('Verdadero "null" ');
} else {
    console.log('Falso "null" ');
}

if ({}) { //  Truty
    console.log('Verdadero "{}" ');
} else {
    console.log('Falso "{}" ');
}

// Operadores de Arreglos en JS

let arreglo = [
    function () {
        return '0'
    },
    1
    ,
    'A', true, null, {}, []];

const arregloNumeros = [1, 2, 3, 4, 5, 6];

// 1) Impriman en consola todos los elementos

const arregloNumerosForEach = [1, 2, 3, 4, 5, 6];

const rForEach = arregloNumerosForEach
    .forEach(
        function (valorActual) {
            console.log(`Valor: ${valorActual}`);
        }
    );


const r2ForEach = arregloNumerosForEach
    .forEach(n => console.log(`${n}`));


console.log(`RESPUESTA FOREACH: ${rForEach}`);

// 2) Sumen 2 a los pares y 1 a los impares
const arregloNumerosMap = [1, 2, 3, 4, 5, 6];

const rMap = arregloNumerosMap
    .map(  // Devolver el nuevo VALOR de ese elemento
        (valorActual) => {
            const esPar = valorActual % 2 == 0;
            if (esPar) {
                const nuevoValor = valorActual + 2;
                return nuevoValor;
            } else {
                const nuevoValor = valorActual + 1;
                return nuevoValor;
            }
        }
    );

console.log(`RESPUESTA MAP: ${rMap}`); // Nuevo Arreglo

// 3) Encuentren si hay el numero 4

const arregloNumerosFind = [1, 2, 3, 4, 5, 6];

const rFind = arregloNumerosFind
    .find( // CONDICION para devolver ese ELEMENTO
        (valorActual)=>{
            return valorActual == 4;
        }
    );
console.log(`Respuesta FIND: ${rFind}`);

// 4) Filtren los numeros menores a 5


const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];

const rFilter = arregloNumerosFilter
    .filter(  // CONDICION TRUE  -> Agrega al arreglo
        //       CONDICION FALSA -> Se omite del arreglo
        (valorActual)=>{
            return valorActual < 5;
        }
    );
console.log(`Respuesta FILTER: ${rFilter}`);
 */
// 5) TODOS los valores positivos
// 6) ALGUN valor es menor que 2
// 7) Sumen todos los valores
// 8) Resten todos los valores de 100


// 1.1) Sumen 10 a todos
// 1.2) Filtren a los mayores a 15
// 1.3) Si hay algun numero mayor a 30


