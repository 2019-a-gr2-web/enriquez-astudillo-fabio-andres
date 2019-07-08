import { Injectable } from "@nestjs/common";
import { PacienteEntity } from "./paciente.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "./paciente";

@Injectable()
export class PacienteService {

    constructor(
        @InjectRepository(PacienteEntity)
        private readonly _pacienteRepository: Repository<PacienteEntity>
    ){}

    crear(nuevoPaciente: Paciente):Promise<Paciente> {
        const objetoEntidad = this._pacienteRepository.create(nuevoPaciente)
        return this._pacienteRepository.save(objetoEntidad);
    }

    buscar(parametros?){
        return this._pacienteRepository.find(parametros)
    }

    eliminar(parametros){
        this._pacienteRepository.delete(parametros)
    }

    actualizar(nuevoPaciente: Paciente, parametros){
        this._pacienteRepository.update(parametros,nuevoPaciente)
    }
}