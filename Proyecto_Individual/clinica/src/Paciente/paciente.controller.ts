import { Controller, Post, Body, Res, Get, Put, Delete, Query, Param } from "@nestjs/common";
import { PacienteService } from "./paciente.service";
import { Paciente } from "./paciente";

@Controller('/clinica/pacientes')
export class PacienteController {
    
    constructor(
        private readonly _pacienteService:PacienteService
    ) {}

    @Post('crear') 
    async crearPaciente(
        @Body('nombre') nombre:string,
        @Body('fechaNac') fechaNac:Date,
        @Body('alergias') alergias:string,
        @Res() res
    ){
        fechaNac = new Date(fechaNac);
        const paciente:Paciente = {
            nombre:nombre,
            fechaNac:fechaNac,
            alergias:alergias
        }
        try{
            const resCrear = await this._pacienteService.crear(paciente)
            res.send({mensaje:'Registro Ingresado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
    }

    @Get('listar')
    async listarPacientes(
        @Res() res,
        @Query() query
    ){
        let arrayPacientes
        if(query.nombre)
            arrayPacientes = await this._pacienteService.buscar({nombre:query.nombre})
        else
            arrayPacientes = await this._pacienteService.buscar()
        res.send(arrayPacientes)
    }

    @Delete('eliminar/:id')
    async eliminarPacientes(
        @Res() res,
        @Param() param,
    ){
        
        try{
            const idP:Number = Number(param.id)
            const resEliminar = await this._pacienteService.eliminar({id:idP})
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
        @Body('nombre') nombre:string,
        @Body('fechaNac') fechaNac:Date,
        @Body('alergias') alergias:string,
        @Res() res
    ){
        fechaNac = new Date(fechaNac);
        try{
            const paciente:Paciente = {
                nombre:nombre,
                fechaNac:fechaNac,
                alergias:alergias
            }
            const idP:Number = Number(param.id)
            const resActualizar = await this._pacienteService.actualizar(paciente,{id:idP})
            res.send({mensaje:'Registro Actualizado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
        
    }
}