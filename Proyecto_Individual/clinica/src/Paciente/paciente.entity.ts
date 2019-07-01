import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { CitaEntity } from "src/Cita/cita.entity";

@Entity('bd_paciente') // Nombre tabla
export class PacienteEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: "varchar",
        length: 15,
        name: 'pac_nombre'
    })
    nombre: string;

    @Column({
        type: "varchar",
        length: 15,
        name: 'pac_apellido'
    })
    apellido: string;

    @Column({
        type: "varchar",
        length: 100,
        name: 'pac_alergias'
    })
    alergias: string;

    @Column({
        type: "date",
        name: 'pac_fechNac'
    })
    fechNac: Date;

    @OneToMany(type => CitaEntity, cita => cita.paciente)
    citas: CitaEntity[];
}
