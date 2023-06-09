import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './f1.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
