import { Controller, Get, Post, Response, Request, Body } from '@nestjs/common';
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
    const Nombre:String = this.appService.getNombre(req);
    return res.render('conductores',{Nombre:Nombre});
  }

  @Post('/conductores')
  postConductores(@Body('Nombre') Nombre:String, @Response() res){
    res.cookie('Nombre',Nombre,{signed:true});
    res.redirect('/api/conductores');
  }

  @Get('/conductores/gestionar')
  getGestionar(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req);
    return res.render('gestionar',{
                                      Nombre:Nombre,
                                      bddConductores:this.appService.bddConductores
                                    });
  }

  @Get('/conductores/gestionar/crear')
  getCrear(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req);
    return res.render('crear',{
                                Nombre:Nombre,
                                bddConductores:this.appService.bddConductores
                              });
  }

  @Post('/conductores/gestionar/crear')
  postCrear(
            @Body('nombres') nombres: string,
            @Body('apellidos') apellidos: string,
            @Body('fechaNac') fechaNac:any,
            @Body('licVal') licVal:any,
            @Response() res){
              
    this.appService.crear(this.appService.construirConductor(nombres, apellidos, new Date(fechaNac), Boolean(licVal)));
    res.redirect('/api/conductores/gestionar');
  }
}
