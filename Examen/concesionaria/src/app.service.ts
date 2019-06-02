import { Injectable, Request, Response } from '@nestjs/common';
import {conductor} from './interfaces/conductor';

@Injectable()
export class AppService {

  bddConductores: conductor[] = [];

  construirConductor(nombres: string, apellidos: string, fechaNacimiento: Date, licenciaValida: boolean): conductor {
    const conductor: conductor = {
      nombres,
      apellidos,
      fechaNacimiento,
      licenciaValida,
      autos: [],
    };
    return conductor;
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
