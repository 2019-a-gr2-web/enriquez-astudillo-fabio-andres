import {  Controller,
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
          Response } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieAccessInfo } from 'cookiejar';


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/semilla')
  semilla(@Response() res, @Query() q){
      const usuario = q.usuario
      res.cookie('usuario', usuario)
      res.cookie('valor', 100, {signed:true})
      res.send({nombreUsuario:usuario,
                resultado:100})
  }

  @Get('/suma')
  suma(@Query() query, @Request() req, @Response() res){
    const number1 = Number(query.numero1);
    const number2 = Number(query.numero2);
    const tot = number1 + number2;
    const cookieS = req.signedCookies.valor;
    const newVal = Number(cookieS) - tot;
    if(newVal > 0) {
      console.log(newVal);
      res.cookie('valor',newVal,{signed:true})
      res.send(String(tot));
    } else {
      res.cookie('valor',0,{signed:true})
      res.send({nombreUsuario:req.cookies.usuario,
                resultado: 2,
                mensaje: 'Se le terminaron sus puntos'});
    }
  }
  
  @Get('/resta')
  resta(@Query() query, @Request() req, @Response() res){
    const number1 = Number(query.numero1);
    const number2 = Number(query.numero2);
    const tot = number1 - number2;
    const cookieS = req.signedCookies.valor;
    const newVal = Number(cookieS) - tot;
    if(newVal > 0) {
      console.log(newVal);
      res.cookie('valor',newVal,{signed:true})
      res.send(String(tot));
    } else {
      res.cookie('valor',0,{signed:true})
      res.send({nombreUsuario:req.cookies.usuario,
                resultado: 2,
                mensaje: 'Se le terminaron sus puntos'});
    }
  }

  @Get('/multiplicacion')
  multiplicacion(@Query() query, @Request() req, @Response() res){
    const number1 = Number(query.numero1);
    const number2 = Number(query.numero2);
    const tot = number1 * number2;
    const cookieS = req.signedCookies.valor;
    const newVal = Number(cookieS) - tot;
    if(newVal > 0) {
      console.log(newVal);
      res.cookie('valor',newVal,{signed:true})
      res.send(String(tot));
    } else {
      res.cookie('valor',0,{signed:true})
      res.send({nombreUsuario:req.cookies.usuario,
                resultado: 2,
                mensaje: 'Se le terminaron sus puntos'});
    }
  }

  @Get('/division')
  division(@Query() query, @Request() req, @Response() res){
    const number1 = Number(query.numero1);
    const number2 = Number(query.numero2);
    const tot = number1 / number2;
    const cookieS = req.signedCookies.valor;
    const newVal = Number(cookieS) - tot;
    if(newVal > 0) {
      console.log(newVal);
      res.cookie('valor',newVal,{signed:true})
      res.send(String(tot));
    } else {
      res.cookie('valor',0,{signed:true})
      res.send({nombreUsuario:req.cookies.usuario,
                resultado: 2,
                mensaje: 'Se le terminaron sus puntos'});
    }
  }


}
