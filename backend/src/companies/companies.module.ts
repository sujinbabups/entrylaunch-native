import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [],
  controllers: [],
  exports: [],
})
export class CompaniesModule {}