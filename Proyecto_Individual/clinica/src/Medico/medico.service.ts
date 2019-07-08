import { Injectable } from "@nestjs/common";
import { Medico } from "./medico";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicoEntity } from "./medico.entity";
import { Repository } from "typeorm";

@Injectable()
export class MedicoService {

    constructor(
        @InjectRepository(MedicoEntity)
        private readonly _medicoRepository: Repository<MedicoEntity>
    ){}

    crear(nuevoMedico: Medico):Promise<Medico> {
        const objetoEntidad = this._medicoRepository.create(nuevoMedico)
        return this._medicoRepository.save(objetoEntidad);
    }

    buscar(parametros?){
        return this._medicoRepository.find(parametros)
    }

    eliminar(parametros){
        this._medicoRepository.delete(parametros)
    }

    actualizar(nuevoMedico: Medico, parametros){
        this._medicoRepository.update(parametros,nuevoMedico)
    }
}