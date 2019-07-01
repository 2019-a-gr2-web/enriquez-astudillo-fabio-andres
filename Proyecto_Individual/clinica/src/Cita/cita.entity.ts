import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { MedicoEntity } from "src/Medico/medico.entity";
import { PacienteEntity } from "src/Paciente/paciente.entity";

@Entity('bd_cita') // Nombre tabla
export class CitaEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'date',
        name: 'cita_fecha'
    })
    fecha: Date;

    @Column({
        type: 'time',
        name: 'cita_hora'
    })
    hora: Date;

    @ManyToOne(type => PacienteEntity, paciente => paciente.citas)
    paciente: PacienteEntity;

    @ManyToOne(type => MedicoEntity, medico => medico.citas)
    medico: MedicoEntity;
    
}
