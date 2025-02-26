import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schema/job.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])], // ✅ Register Mongoose schema
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService], // ✅ Export if needed elsewhere
})
export class JobsModule {}
