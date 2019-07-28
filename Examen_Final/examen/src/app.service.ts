import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoEntity } from './equipo/equipo.entity';
import { JugadorEntity } from './jugador/jugador.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>,
    
    @InjectRepository(EquipoEntity)
    private readonly _equipoRepository: Repository<EquipoEntity>,

    @InjectRepository(JugadorEntity)
    private readonly _jugadorRepository: Repository<JugadorEntity>
  ) {}

  buscarUsuario(parametrosBusqueda):Promise<UsuarioEntity[]>{
    return this._usuarioRepository.find(parametrosBusqueda);
  } 

  recuperarEquipos():Promise<EquipoEntity[]>{
    return this._equipoRepository.find();
  } 

  recuperarJugadores():Promise<JugadorEntity[]>{
    return this._jugadorRepository.find();
  }
}
