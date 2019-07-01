import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { MedicoEntity } from "./medico.entity";
import { MedicoController } from "./medico.controler";
import { MedicoService } from "./medico.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MedicoEntity],'default'),
    ],  // Modulos
    controllers: [MedicoController], // Controladores
    providers: [MedicoService], // Servicios
    exports: [MedicoService] // Exportar Servicios
})
export class MedicoModule {
}