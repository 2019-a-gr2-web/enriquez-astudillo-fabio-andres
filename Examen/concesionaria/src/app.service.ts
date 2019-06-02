import { Injectable, Request, Response } from '@nestjs/common';
import {conductor} from './interfaces/conductor';
import { isDate } from 'util';

@Injectable()
export class AppService {

  bddConductores: conductor[] = [];
  ids: number = 0;

  construirConductor(nombres: string, apellidos: string, fechaNacimiento: Date, licenciaValida: boolean): conductor {
    const conductor1:conductor = {
      id:this.ids,
      nombres,
      apellidos,
      fechaNacimiento:fechaNacimiento,
      licenciaValida:licenciaValida,
      autos: []
    };
    this.ids++;
    return conductor1;
  }

  getNombre(@Request() req) {
    const cookie = req.signedCookies.Nombre;
    if (cookie) {
      return cookie;
    } else {
      console.log('Cookie no válida');
      // codigo para volvera al login
    }
  }

  borrarCookie(@Response() res) {
    res.clearCookie('Nombre');
  }

  crear(nuevoConductor: conductor){
    this.bddConductores.push(nuevoConductor);
  }

  



}
