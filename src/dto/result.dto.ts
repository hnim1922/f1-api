import { ApiProperty } from '@nestjs/swagger';

export class ResultDTO {
    @ApiProperty()
    year: number;
  
    @ApiProperty()
    winner: string;
  
    @ApiProperty()
    grandPrix: string;
}