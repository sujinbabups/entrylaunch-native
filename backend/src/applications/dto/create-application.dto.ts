import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  jobId!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coverLetter!: string;
}