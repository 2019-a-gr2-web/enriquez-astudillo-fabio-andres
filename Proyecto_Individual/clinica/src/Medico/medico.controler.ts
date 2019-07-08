import { Controller, Post, Body, Res, Get, Query, Delete, Param, Put } from "@nestjs/common";
import { MedicoService } from "./medico.service";
import { Medico } from "./medico";

@Controller('/cinica/medicos')
export class MedicoController {
    constructor(
        private readonly _medicoService:MedicoService
    ) {}

    @Post('crear') 
    async crearMedico(
        @Body('nombre') nombre:string,
        @Body('especialidad') esp:string,
        @Body('oficina') oficina:string,
        @Res() res
    ){
        const medico:Medico = {
            nombre:nombre,
            especialidad:esp,
            oficina:oficina
        }
        try{
            const resCrear = await this._medicoService.crear(medico)
            res.send({mensaje:'Registro Ingresado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
    }

    @Get('listar')
    async listarMedicos(
        @Res() res,
        @Query() query
    ){
        let arrayMedicos
        if(query.nombre)
            arrayMedicos = await this._medicoService.buscar({nombre:query.nombre})
        else
            arrayMedicos = await this._medicoService.buscar()
        res.send(arrayMedicos)
    }

    @Delete('eliminar/:id')
    async eliminarMedico(
        @Res() res,
        @Param() param,
    ){
        
        try{
            const idP:Number = Number(param.id)
            const resEliminar = await this._medicoService.eliminar({id:idP})
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
        @Body('especialidad') esp:string,
        @Body('oficina') oficina:string,
        @Res() res
    ){
        
        try{
            const medico:Medico = {
                nombre:nombre,
                especialidad:esp,
                oficina:oficina
            }
            const idP:Number = Number(param.id)
            const resActualizar = await this._medicoService.actualizar(medico,{id:idP})
            res.send({mensaje:'Registro Actualizado',codigo:200})
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }
        
    }
}