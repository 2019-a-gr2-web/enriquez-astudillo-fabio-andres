import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JugadorEntity } from "./jugador.entity";
import { JugadorController } from "./jugador.controller";
import { JugadorService } from "./jugador.service";

@Module({
    imports: [ TypeOrmModule.forFeature( [ JugadorEntity ], 'default' ) ],
    controllers: [ JugadorController ], 
    providers: [ JugadorService ],
    exports: [ JugadorService ] 
})
export class JugadorModule {}