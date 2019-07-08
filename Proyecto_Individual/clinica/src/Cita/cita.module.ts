import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { CitaEntity } from "./cita.entity";
import { CitaController } from "./cita.controller";
import { CitaService } from "./cita.service";
import { PacienteService } from "src/Paciente/paciente.service";
import { MedicoService } from "src/Medico/medico.service";
import { PacienteEntity } from "src/Paciente/paciente.entity";
import { MedicoEntity } from "src/Medico/medico.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ CitaEntity, PacienteEntity, MedicoEntity ],'default'),
    ],  // Modulos
    controllers: [ CitaController ], // Controladores
    providers: [ CitaService, PacienteService, MedicoService ], // Servicios
    exports: [ CitaService ] // Exportar Servicios
})
export class CitaModule {
}