import { Controller, Get, Post, Put, Delete, Res, Req, Param, Query, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioEntity } from './usuario/usuario.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  getLogin(
    @Res() res
  ) {
    return res.render('Login')
  }

  @Post('/login')
  async postLogin(
      @Body() usuario,
      @Res() res,
      @Session() session
  ){
      const usuariosDeLaBase:UsuarioEntity[] = await this.appService.buscarUsuario({userName:usuario.userName})
    
      if(usuariosDeLaBase[0] != null) { //comprueba si existe el usuario
        if(usuariosDeLaBase[0].password == usuario.password) { //comprueba si es la contrasenia correcta
          session.userName = usuariosDeLaBase[0].userName;
          session.rol = usuariosDeLaBase[0].rol;
          switch(session.rol) {
            case 'admin':
              return res.redirect('/administrador')
            case 'cliente':
              return res.redirect('/cliente')
            case 'despachador':
              return res.redirect('/despachador')
          }
            
        } else {
          res.status(400)
          res.send({mensaje:'Error, password incorrecto',error:400})
        }
      } else {

        res.status(400)
        res.send({mensaje:'Error, usuario no existe',error:400})
      }    
  }

  @Get('/administrador')
  async getAdministrador(
      @Session() session,
      @Res() res
  ){
    try{
      const equipos = await this.appService.recuperarEquipos()
      if(session.userName){
        return res.render('Administrador',
        {
          nombre:session.userName,
          rol:session.rol,
          equipos
        });
      }else{
          return res.redirect('/login');
      }
    } catch(exception){
      console.log("No se pudeo iniciar")
    }
      
  }

    @Get('/cliente')
    getCliente(
        @Session() session,
        @Res() res
    ){
        if(session.userName){
            res.render('Cliente',
            {
              nombre:session.userName,
              rol:session.rol
            });
        }else{
            res.redirect('/login');
        }
    }

    @Get('/despachador')
    getDespachador(
        @Session() session,
        @Res() res
    ){
        if(session.userName){
            res.render('Despachador',
            {
              nombre:session.userName,
              rol:session.rol
            });
        }else{
            res.redirect('/login');
        }
    }

    @Post('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.rol = undefined;
        session.destroy();
        res.clearCookie('server-session-id');
        res.redirect('/login');
    }
}
