import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Application } from '../../applications/schema/application.schema';
export declare enum JobType {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    CONTRACT = "contract",
    INTERNSHIP = "internship"
}
export type JobDocument = Job & Document;
export declare class Job {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: JobType;
    description: string;
    requirements: string[];
    employerId: Types.ObjectId;
    employer: User;
    applications: Application[];
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, Document<unknown, any, Job> & Job & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, Document<unknown, {}, import("mongoose").FlatRecord<Job>> & import("mongoose").FlatRecord<Job> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
