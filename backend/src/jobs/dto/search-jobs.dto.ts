import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '../schema/job.schema';

export class SearchJobsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ enum: JobType, required: false })
  @IsEnum(JobType)
  @IsOptional()
  type?: JobType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  skip: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @IsOptional()
  take: number = 10;
}