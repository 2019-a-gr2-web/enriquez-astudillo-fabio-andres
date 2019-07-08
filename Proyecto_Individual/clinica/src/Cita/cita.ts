import { Paciente } from "src/Paciente/paciente";
import { Medico } from "src/Medico/medico";

export interface Cita {
    paciente: Paciente;
    medico: Medico;
    fecha: Date;
    hora: Date;
}