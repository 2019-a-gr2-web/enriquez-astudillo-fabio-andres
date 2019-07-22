import { Controller, Query, Body, Param, Get, Post, Put, Delete, Res } from "@nestjs/common";
import { CitaService } from "./cita.service";
import { PacienteService } from "src/Paciente/paciente.service";
import { MedicoService } from "src/Medico/medico.service";
import { Cita } from "./cita";
import { MedicoEntity } from "src/Medico/medico.entity";
import { PacienteEntity } from "src/Paciente/paciente.entity";

@Controller('/clinica/citas')
export class CitaController {
    constructor(
        private readonly _citaService:CitaService,
        private readonly _pacienteService:PacienteService,
        private readonly _medicoService:MedicoService,
    ) {}

    @Post('crear') 
    async crearCita(
        @Body('paciente') paciente:string,
        @Body('medico') medico:string,
        @Body('fecha') fecha:Date,
        @Res() res
    ){
        fecha = new Date(fecha);
        
        let _medico:MedicoEntity[] = await this._medicoService.buscar({nombre:medico})
        let _paciente:PacienteEntity[] = await this._pacienteService.buscar({nombre:paciente})

        const cita:Cita = {
            paciente:_paciente[0],
            medico:_medico[0],
            fecha:fecha
        }

        try{
            const resCrear = await this._citaService.crear(cita)
            res.send({mensaje:'Registro Ingresado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
    }

    @Get('listar')
    async listarCitas(
        @Res() res,
        @Query() query
    ){
        let arrayCita
        if(query.nombre) {
            arrayCita = await this._citaService.buscar({nombre:query.nombre})
            res.send({
                id: arrayCita[0].id,
                medico: arrayCita[0].medico.id,
                paciente: arrayCita[0].paciente.id,
                fecha: arrayCita[0].fecha
            })
        } else {
            arrayCita = await this._citaService.buscar()
            res.send(arrayCita)
        }
    }

    @Delete('eliminar/:id')
    async eliminarCita(
        @Res() res,
        @Param() param,
    ){
        
        try{
            const idP:Number = Number(param.id)
            const resEliminar = await this._citaService.eliminar({id:idP})
            res.send({mensaje:'Registro Eliminado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
    }

    @Put('actualizar/:id')
    async actualizar(
        @Param() param,
        @Body('paciente') paciente:string,
        @Body('medico') medico:string,
        @Body('fecha') fecha:Date,
        @Res() res
    ){
        fecha = new Date(fecha);
        let _paciente = await this._pacienteService.buscar({id:paciente})
        let _medico = await this._medicoService.buscar({nombre:medico})

        try{
            const cita:Cita = {
                paciente:_paciente[0],
                medico:_medico[0],
                fecha:fecha
            }
            const idP:Number = Number(param.id)
            const resActualizar = await this._citaService.actualizar(cita,{id:idP})
            res.send({mensaje:'Registro Actualizado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
        
    }
}