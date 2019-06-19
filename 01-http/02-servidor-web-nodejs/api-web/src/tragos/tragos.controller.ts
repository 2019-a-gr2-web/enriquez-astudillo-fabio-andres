import {Controller, Get, Response, Post, Body} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import { Trago } from "./interfaces/Trago";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService:TragosService) {
        
    }

    @Get('lista')
    async listarTragos(@Response() res){
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',
        {
            arregloTragos:arregloTragos
        })
    }

    @Get('crear')
    crearTragos(@Response() res){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago:Trago,
        @Body('nombre') nombre:string,
        @Body('tipo') tipo:string,
        @Body('gradosAlcohol') gradosAlcohol:number,
        @Body('fechaCaducidad') fechaCaducidad:Date,
        @Body('precio') precio:number,
        @Response() res
    ){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        //console.log(trago);

        try {
            const respuestaCrear = await this._tragosService.crear(trago);
            console.log('Respuesta: ',respuestaCrear);
            
            res.redirect('/api/traguito/lista')
        }
        catch(e){
            console.error(e)
            res.status(500);
            res.send({
                mensaje:'Error',
                codigo:500
            })
        }
       

        // console.log('Trago: ', trago, typeof trago);
        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);

    }

    @Post('eliminar')
    eliminarTragoPost(@Body() id:number){
        this._tragosService.eliminar(id);
    }

    

}