import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario') 
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario:number
    
    @Column()
    userName: string
    
    @Column()
    password: string
    
    @Column()
    rol: string    
}