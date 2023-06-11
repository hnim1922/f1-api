import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { F1Service } from './f1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './result.entity';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([ResultEntity])],
  controllers: [AppController],
  providers: [F1Service],
})
export class AppModule { }
