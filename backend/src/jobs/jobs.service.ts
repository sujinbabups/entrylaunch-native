import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job, JobDocument } from './schema/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchJobsDto } from './dto/search-jobs.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobsRepository: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto, employerId: string): Promise<Job> {
    const job = new this.jobsRepository({
      ...createJobDto,
      employerId: new Types.ObjectId(employerId), // ✅ Convert employerId to ObjectId
    });
    return job.save();
  }

  async findAll(searchDto: SearchJobsDto): Promise<[Job[], number]> {
    const query: any = {};

    if (searchDto.search) {
      query.$or = [
        { title: { $regex: searchDto.search, $options: 'i' } },
        { company: { $regex: searchDto.search, $options: 'i' } },
        { location: { $regex: searchDto.search, $options: 'i' } },
      ];
    }

    if (searchDto.type) {
      query.type = searchDto.type;
    }

    if (searchDto.location) {
      query.location = searchDto.location;
    }

    const jobs = await this.jobsRepository
      .find(query)
      .sort({ createdAt: -1 })
      .skip(searchDto.skip || 0)
      .limit(searchDto.take || 10)
      .exec();

    const total = await this.jobsRepository.countDocuments(query);
    return [jobs, total];
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findById(new Types.ObjectId(id)).exec();
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.jobsRepository.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateJobDto,
      { new: true },
    ).exec();

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobsRepository.findByIdAndDelete(new Types.ObjectId(id)).exec();
    if (!result) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }
}
