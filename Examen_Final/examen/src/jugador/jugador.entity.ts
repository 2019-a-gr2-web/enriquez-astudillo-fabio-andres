import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { EquipoEntity } from "src/equipo/equipo.entity";

@Entity('jugador') 
export class JugadorEntity {

    @PrimaryGeneratedColumn()
    id_jugador:number

    @Column()
    numeroCamiseta:number

    @Column()
    nombreCamiseta:string

    @Column()
    nombreCompleto:string

    @Column()
    fechaIngresoEquipo:Date

    @Column()
    goles:number

    @ManyToOne(type => EquipoEntity, equipo => equipo.jugadores)
    equipo:EquipoEntity
}