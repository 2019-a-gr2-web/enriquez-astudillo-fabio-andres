import { Controller, Query, Body, Param, Get, Post, Put, Delete, Res } from "@nestjs/common";
import { CitaService } from "./cita.service";
import { PacienteService } from "src/Paciente/paciente.service";
import { MedicoService } from "src/Medico/medico.service";
import { Cita } from "./cita";

@Controller('/clinica/citas')
export class CitaController {}
/*    constructor(
        private readonly _citaService:CitaService,
        private readonly _pacienteService:PacienteService,
        private readonly _medicoService:MedicoService
    ) {}

    @Post('crear') 
    async crearCita(
        @Body('paciente') paciente:string,
        @Body('medico') medico:string,
        @Body('fecha') fecha:Date,
        @Body('hora') hora:Date,
        @Res() res
    ){
        fecha = new Date(fecha);
        hora = new Date(hora);
        let _paciente = this._pacienteService.buscar({id:paciente})
        let _medico = this._medicoService.buscar({nombre:medico})

        const cita:Cita = {
            paciente:_paciente[0],
            medico:_medico[0],
            fecha:fecha,
            hora:hora
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
        if(query.nombre)
            arrayCita = await this._citaService.buscar({nombre:query.nombre})
        else
            arrayCita = await this._citaService.buscar()
        res.send(arrayCita)
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
        @Body('hora') hora:Date,
        @Res() res
    ){
        fecha = new Date(fecha);
        hora = new Date(hora);
        let _paciente = this._pacienteService.buscar({id:paciente})
        let _medico = this._medicoService.buscar({nombre:medico})

        try{
            const cita:Cita = {
                paciente:_paciente[0],
                medico:_medico[0],
                fecha:fecha,
                hora:hora
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
}*/