import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JugadorModule } from './jugador/jugador.module';
import { EquipoModule } from './equipo/equipo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JugadorEntity } from './jugador/jugador.entity';
import { EquipoEntity } from './equipo/equipo.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ UsuarioEntity ], 'default' ),
    TypeOrmModule.forFeature( [ EquipoEntity ], 'default' ),
    TypeOrmModule.forFeature( [ JugadorEntity ], 'default' ),
    JugadorModule,
    EquipoModule,
    UsuarioModule,
    TypeOrmModule.forRoot({
      name: 'default', 
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'examen_web',
      entities: [
          JugadorEntity,
          EquipoEntity,
          UsuarioEntity
      ],
      synchronize: true,
      insecureAuth : true,
      dropSchema: false
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
