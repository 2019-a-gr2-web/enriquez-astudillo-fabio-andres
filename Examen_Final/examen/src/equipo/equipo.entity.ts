import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { JugadorEntity } from "src/jugador/jugador.entity";

@Entity('equipo') 
export class EquipoEntity {
    @PrimaryGeneratedColumn()
    id_equipo:number
    
    @Column()
    nombre: string

    @Column()
    liga: string
    
    @Column()
    fechaCreacion: Date
    
    @Column()
    numeroCopasInternacionales:number
    
    @Column()
    campeonActual:boolean

    @OneToMany(type => JugadorEntity, jugador => jugador)
    jugadores: JugadorEntity[]
}