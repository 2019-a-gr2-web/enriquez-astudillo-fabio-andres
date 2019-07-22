import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { MedicoEntity } from "src/Medico/medico.entity";
import { PacienteEntity } from "src/Paciente/paciente.entity";
import { type } from "os";

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
        type: 'int',
        nullable: true
    })
    paciente_id: Number

    @Column({
        type: 'int',
        nullable: true
    })
    medico_id: Number

    @ManyToOne(type => PacienteEntity, paciente => paciente.citas)
    @JoinColumn({name: 'paciente_id'})
    paciente: PacienteEntity;

    @ManyToOne(type => MedicoEntity, medico => medico.citas)
    @JoinColumn({name: 'medico_id'})
    medico: MedicoEntity;
    
}
