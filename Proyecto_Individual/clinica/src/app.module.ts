import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './Paciente/paciente.module';
import { MedicoModule } from './Medico/medico.module';
import { CitaModule } from './Cita/cita.module';
import { PacienteEntity } from './Paciente/paciente.entity';
import { MedicoEntity } from './Medico/medico.entity';
import { CitaEntity } from './Cita/cita.entity';

@Module({
  imports: [

    PacienteModule,
    MedicoModule,
    CitaModule,
    TypeOrmModule.forRoot({
        name: 'default', // Nombre cadena conex por defecto de TYPEORM
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'clinica',
        entities: [
            PacienteEntity,
            MedicoEntity,
            CitaEntity
        ],
        synchronize: true,
        insecureAuth : true,
        dropSchema: false
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
