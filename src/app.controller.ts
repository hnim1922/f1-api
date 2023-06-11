import { Controller, Get, Query } from '@nestjs/common';
import { F1Service } from './f1.service';
import { ResultDTO } from './dto/result.dto';
import { ResultEntity } from './result.entity';

@Controller('api/results')
export class AppController {
  constructor(private readonly appService: F1Service) { }

  @Get()
  async fetchAndSaveResults(): Promise<any> {
    return this.appService.fetchAndSaveResults();
  }

  @Get('/results')
  async searchResult(@Query() dto: ResultDTO): Promise<ResultEntity[]> {
    return this.appService.getResultList(dto)
  }
}
