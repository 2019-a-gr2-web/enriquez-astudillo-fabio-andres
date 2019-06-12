import { Controller, Get, Post, Response, Request, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {conductor} from './interfaces/conductor';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  getLogin(@Response() res){
    return res.render('login')
  }

  @Post('/login')
  postLogin(@Response() res, @Request() req){
    this.appService.borrarCookie(res);
    res.redirect('/api/login');
  }

  @Get('/conductores')
  getConductores(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('conductores',{Nombre:Nombre});
  }

  @Post('/conductores')
  postConductores(@Body('Nombre') Nombre:String, @Response() res){
    res.cookie('Nombre',Nombre,{signed:true});
    res.redirect('/api/conductores');
  }

  @Get('/conductores/gestionar')
  getGestionar(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);

    return res.render('gestionar',{
                                      Nombre:Nombre,
                                      bddConductores:this.appService.bddConductores,
                                      bool:true
                                    });
  }

  @Get('/conductores/gestionar/crear')
  getCrear(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('crear',{
                                Nombre:Nombre,
                                bddConductores:this.appService.bddConductores
                              });
  }

  @Post('/conductores/gestionar/crear')
  postCrear(
            @Body('nombres') nombres: string,
            @Body('apellidos') apellidos: string,
            @Body('fechaNac') fechaNac: Date,
            @Body('licVal') licVal: any,
            @Response() res) {
    
    this.appService.crear(this.appService.construirConductor(nombres, apellidos, fechaNac, Boolean(licVal)));
    res.redirect('/api/conductores/gestionar');
  }

  @Get('/conductores/gestionar/autos/:id')
  getGestionarAutos(@Param() Param, @Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('autos',{
                                Nombre:Nombre,
                                bddConductores:this.appService.bddConductores,
                                id:Param.id,
                                bool:true
                              });
  }

  @Get('/conductores/gestionar/autos/:id/crear')
  getCrearAuto(@Param() Param, @Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('crearAutos',{
                                Nombre:Nombre,
                                bddConductores:this.appService.bddConductores,
                                id:Param.id
                              });
  }

  @Post('/conductores/gestionar/autos/:id/crear')
  postCrearAuto(@Body('chasis') chasis: number,
                @Body('marca') marca: string,
                @Body('colorUno') colorUno: string,
                @Body('colorDos') colorDos: string,
                @Body('modelo') modelo: string,
                @Body('anio') anio: number,
                @Response() res,
                @Param() param
  ){
    this.appService.crearAuto(chasis, marca, colorUno, colorDos, modelo, anio, param.id)
    res.redirect('/api/conductores/gestionar/autos/'+param.id)
  }

  @Post('/borrar/conductor/:id')
  postBorrarConductor(@Param() param, @Response() res){
    this.appService.borrarConductor(param.id)
    res.redirect('/api/conductores/gestionar')
  }

  @Post('/borrar/auto/:idCond/:idAut')
  postBorrarAuto(@Param() param, @Response() res) {
    this.appService.borrarAuto(param.idCond, param.idAut)
    res.redirect('/api/conductores/gestionar/autos/'+param.idCond)
  }

  @Post('/buscar/auto')
  PostBuscarAuto(@Body('buscar') buscar: string, @Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('gestionar',{
                                    bool:false,
                                    nombre:buscar,
                                    Nombre:Nombre,
                                    bddConductores:this.appService.bddConductores

                                  })
  }

  
  @Post('/buscar/auto/:id')
  buscarAutos(@Param() Param, @Response() res, @Request() req, @Body('buscar') marca2){
    const Nombre:String = this.appService.getNombre(req, res);
    return res.render('autos',{
                                Nombre:Nombre,
                                bddConductores:this.appService.bddConductores,
                                id:Param.id,
                                bool:false,
                                marca:marca2
                              });
  }

  
}
