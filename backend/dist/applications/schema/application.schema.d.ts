import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Job } from '../../jobs/schema/job.schema';
export declare enum ApplicationStatus {
    PENDING = "pending",
    REVIEWING = "reviewing",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}
export type ApplicationDocument = Application & Document;
export declare class Application {
    jobId: Types.ObjectId;
    candidateId: Types.ObjectId;
    coverLetter: string;
    status: ApplicationStatus;
    job: Job;
    candidate: User;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, Document<unknown, any, Application> & Application & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, Document<unknown, {}, import("mongoose").FlatRecord<Application>> & import("mongoose").FlatRecord<Application> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
