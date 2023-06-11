import { Controller, Get } from '@nestjs/common';
import { F1Service } from './f1.service';

@Controller('api/results')
export class AppController {
  constructor(private readonly appService: F1Service) { }

  @Get()
  async fetchAndSaveResults(): Promise<any> {
    return this.appService.fetchAndSaveResults();
  }
}
