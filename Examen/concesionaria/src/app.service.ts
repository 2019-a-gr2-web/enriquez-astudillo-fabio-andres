import { Injectable, Request, Response } from '@nestjs/common';
import {conductor} from './interfaces/conductor';
import {auto} from './interfaces/auto';

@Injectable()
export class AppService {

  bddConductores: conductor[] = [];
  ids: number = 0;

  construirConductor(nombres: string, apellidos: string, fechaNacimiento: Date, licenciaValida: boolean): conductor {
    const conductor1:conductor = {
      id:this.ids,
      nombres,
      apellidos,
      fechaNacimiento,
      licenciaValida:licenciaValida,
      autos: []
    };
    this.ids++;
    return conductor1;
  }

  getNombre(@Request() req, @Response() res) {
    const cookie = req.signedCookies.Nombre;
    if (cookie) {
      return cookie;
    } else {
      res.redirect('/api/login');
    }
  }

  borrarCookie(@Response() res) {
    res.clearCookie('Nombre');
  }

  crear(nuevoConductor: conductor){
    this.bddConductores.push(nuevoConductor);
  }

  crearAuto(chasis: number, marca: string, colorUno: string, colorDos: string, modelo: string, anio: number, idCond: number) {
    const auto1: auto = {
      chasis,
      nombreMarca: marca,
      colorUno,
      colorDos,
      nombreModelo: modelo,
      anio,
      idConductor: idCond
    }
    this.bddConductores[idCond].autos.push(auto1)
  }

  borrarConductor(id:number){
    this.bddConductores.splice(id,1)
  }

  borrarAuto(idCond: number, idAut:number){
    this.bddConductores[idCond].autos.splice(idAut,1)
  }

}
