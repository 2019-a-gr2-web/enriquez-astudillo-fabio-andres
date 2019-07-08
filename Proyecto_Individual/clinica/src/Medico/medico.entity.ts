import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { CitaEntity } from "src/Cita/cita.entity";

@Entity('bd_medico') // Nombre tabla
export class MedicoEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: "varchar",
        length: 15,
        name: 'med_nombre'
    })
    nombre: string;

    @Column({
        type: "varchar",
        length: 20,
        name: 'med_esp'
    })
    especialidad: string;
    
    @Column({
        type: "varchar",
        length: 3,
        name: 'med_oficina'
    })
    oficina: string;

    @OneToMany(type => CitaEntity, cita => cita.medico)
    citas: CitaEntity[];
}
