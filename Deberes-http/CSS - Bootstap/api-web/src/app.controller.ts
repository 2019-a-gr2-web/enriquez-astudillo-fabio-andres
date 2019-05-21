import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('android')
  android(@Response() res):String {
    return res.render('android.ejs')
  }
}
