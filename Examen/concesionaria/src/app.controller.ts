import { Controller, Get, Post, Response, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Get('/gestionar')
  getGestionar(@Response() res, @Request() req){
    const Nombre:String = this.appService.getNombre(req);
    return res.render('gestionar',{Nombre:Nombre});
  }

  @Post('/gestionar')
  postGestionar(@Body('Nombre') Nombre:String, @Response() res){
    
    res.cookie('Nombre',Nombre,{signed:true});




    res.redirect('/api/gestionar');
  }
}
