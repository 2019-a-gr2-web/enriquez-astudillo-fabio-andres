import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TragosModule } from './tragos/tragos.modules';

@Module({
  imports: [TragosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
