import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, } from 'class-validator';

export class ResultDTO {
    @ApiProperty({ required: false })
    @IsNumber()
    year: number;

    @ApiProperty({ required: false })
    @IsString()
    winner: string;

    @ApiProperty({ required: false })
    @IsString()
    grandPrix: string;
}