import { Paciente } from "src/Paciente/paciente";
import { Medico } from "src/Medico/medico";
import { PacienteEntity } from "src/Paciente/paciente.entity";
import { MedicoEntity } from "src/Medico/medico.entity";

export interface Cita {
    paciente: PacienteEntity;
    medico: MedicoEntity;
    fecha: Date;
}