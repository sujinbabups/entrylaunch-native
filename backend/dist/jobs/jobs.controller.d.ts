import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchJobsDto } from './dto/search-jobs.dto';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: AuthenticatedRequest): Promise<import("./schema/job.schema").Job>;
    findAll(searchDto: SearchJobsDto): Promise<[import("./schema/job.schema").Job[], number]>;
    findOne(id: string): Promise<import("./schema/job.schema").Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<import("./schema/job.schema").Job>;
    remove(id: string): Promise<void>;
}
export {};
