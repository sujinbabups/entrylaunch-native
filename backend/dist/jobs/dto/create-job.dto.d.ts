import { JobType } from '../schema/job.schema';
export declare class CreateJobDto {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: JobType;
    description: string;
    requirements: string[];
}
