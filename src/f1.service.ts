import { Injectable } from '@nestjs/common';

@Injectable()
export class F1Service {
  getHello(): string {
    return 'Hello World!';
  }
  
}
