import { Injectable, Request, Response } from '@nestjs/common';

@Injectable()
export class AppService {


  getNombre(@Request() req):String {
    const cookie = req.signedCookies.Nombre;
    if(cookie){
      return cookie;
    }else{
      console.log('Cookie no válida');
      //codigo para volvera al login
    }
  }

  borrarCookie(@Response() res) {
    res.clearCookie("Nombre")
  }
  


}
