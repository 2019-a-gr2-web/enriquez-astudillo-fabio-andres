import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')  // METODO HTTP
  getHello(): string {
     return 'hola mundo'
  }

  @Get('/adivina')
  adivina(@Headers() headers): string {
      console.log('Headers: ',headers);
      const numeroRandomico = Math.round(Math.random()*10);
      return 'Ok';
  }

  @Post('/hola-mundo')  // METODO HTTP
  postHello(): string{
    return 'hola mundo';
  }
  @Put('/helo')
  putHello(): string{
    return 'helo'
  }
  @Delete('/ola')
  deleteHello(): string{
    return 'ola'
  }



}
const json = [
  {llave:"valor"}
];
let obketo = {
  propiedad: 'valor',
  propiedad2: 'valor2'
};
objeto.propiedad
objeto.propiedad2
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