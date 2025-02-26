import { Document } from 'mongoose';
import { Job } from '../../jobs/schema/job.schema';
import { Types } from 'mongoose';
export declare enum UserRole {
    CANDIDATE = "candidate",
    EMPLOYER = "employer"
}
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    title?: string;
    location?: string;
    about?: string;
    skills?: string[];
    resumeUrl?: string;
    postedJobs?: Job[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
