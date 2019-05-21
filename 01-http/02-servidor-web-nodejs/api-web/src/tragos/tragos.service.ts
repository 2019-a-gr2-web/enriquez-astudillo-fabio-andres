import { Injectable } from '@nestjs/common';
import {Trago} from "./interfaces/Trago";

@Injectable()
export class TragosService {
  bddTragos:Trago[] = [];
  recnum = 1;

  constructor(){
    const traguito:Trago = {
      nombre:'Pilsener',
      gradosAlcohol: 4.3,
      fechaCaducidad: new Date(2019,5,12),
      precio:1.75,
      tipo:'Cerveza'
    }; 
    this.crear(traguito);
  }

  crear(nuevoTrago:Trago):Trago{
    nuevoTrago.id = this.recnum;
    this.recnum++;
    this.bddTragos.push(nuevoTrago);
    return nuevoTrago;
  }

  consultarPorId(id:number):Trago{
    return this.bddTragos.find(
      (trago)=>{
        return trago.id === id; 
      }
    );
  }

  consultarPorNombre(nombre:String):Trago{
    return this.bddTragos.find(
      (trago)=>{
       return trago.nombre.toUpperCase().includes(nombre.toUpperCase()); 
      }
    );
  }

  actualiar(tragoActualizado:Trago, id:number):Trago[]{
    const indice = this.bddTragos.findIndex(
      (trago)=>{
        return trago.id === id
      }
    ); 
    tragoActualizado.id = this.bddTragos[indice].id;
    this.bddTragos[indice] = tragoActualizado;
    return this.bddTragos;
  }

  eliminar(id:number):Trago[]{
    const indice = this.bddTragos.findIndex(
      (trago)=>{
        return trago.id === id
      }
    ); 
    this.bddTragos.splice(indice,1);
    return this.bddTragos;
  }
}
