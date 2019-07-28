import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EquipoEntity } from "./equipo.entity";
import { EquipoController } from "./equipo.controller";
import { EquipoService } from "./equipo.service";

@Module({
    imports: [ TypeOrmModule.forFeature( [ EquipoEntity ], 'default' ) ],
    controllers: [ EquipoController ], 
    providers: [ EquipoService ],
    exports: [ EquipoService ] 
})
export class EquipoModule {}