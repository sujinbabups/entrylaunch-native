import { Model } from 'mongoose';
import { Job, JobDocument } from './schema/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchJobsDto } from './dto/search-jobs.dto';
export declare class JobsService {
    private jobsRepository;
    constructor(jobsRepository: Model<JobDocument>);
    create(createJobDto: CreateJobDto, employerId: string): Promise<Job>;
    findAll(searchDto: SearchJobsDto): Promise<[Job[], number]>;
    findOne(id: string): Promise<Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<Job>;
    remove(id: string): Promise<void>;
}
