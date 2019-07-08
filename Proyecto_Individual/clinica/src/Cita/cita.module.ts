import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { CitaEntity } from "./cita.entity";
import { CitaController } from "./cita.controller";
import { CitaService } from "./cita.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CitaEntity],'default'),
    ],  // Modulos
    controllers: [CitaController], // Controladores
    providers: [CitaService], // Servicios
    exports: [CitaService] // Exportar Servicios
})
export class CitaModule {
}