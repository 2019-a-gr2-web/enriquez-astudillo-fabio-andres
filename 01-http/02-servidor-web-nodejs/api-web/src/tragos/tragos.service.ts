import { Injectable } from '@nestjs/common';
import {Trago} from "./interfaces/Trago";

@Injectable()
export class frService {
  bddTragos:Trago[] = [];
  recnum = 1;

  crear(nuevoTrago:Trago):Trago{
    nuevoTrago.id = this.recnum;
    this.recnum++;
    this.bddTragos.push(nuevoTrago);
    return nuevoTrago;
  }

  consultar(id:number):Trago{
    return this.bddTragos.find(
      (trago)=>{
       return trago.id === id; 
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
