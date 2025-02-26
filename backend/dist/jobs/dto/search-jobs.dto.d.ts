import { JobType } from '../schema/job.schema';
export declare class SearchJobsDto {
    search?: string;
    type?: JobType;
    location?: string;
    skip: number;
    take: number;
}
