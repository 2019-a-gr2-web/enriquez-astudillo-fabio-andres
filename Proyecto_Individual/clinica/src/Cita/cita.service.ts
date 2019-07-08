import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CitaEntity } from "./cita.entity";
import { Repository } from "typeorm";
import { Cita } from "./cita";

@Injectable()
export class CitaService {
    constructor(
        @InjectRepository(CitaEntity)
        private readonly _citaRepository: Repository<CitaEntity>
    ){}

    crear(nuevaCita: Cita):Promise<Cita> {
        
        const objetoEntidad = this._citaRepository.create(nuevaCita)
        return this._citaRepository.save(objetoEntidad);
    }

    buscar(parametros?){
        return this._citaRepository.find(parametros)
    }

    eliminar(parametros){
        this._citaRepository.delete(parametros)
    }

    actualizar(nuevaCita: Cita, parametros){
        this._citaRepository.update(parametros,nuevaCita)
    }
}