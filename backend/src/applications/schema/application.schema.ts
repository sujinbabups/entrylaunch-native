import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Job } from '../../jobs/schema/job.schema';

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWING = 'reviewing',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

// ✅ Extend Document for Mongoose compatibility
export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true }) // ✅ Automatically creates `createdAt` & `updatedAt`
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true }) // ✅ Reference to Job
  jobId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // ✅ Reference to Candidate (User)
  candidateId!: Types.ObjectId;

  @Prop({ required: true })
  coverLetter!: string;

  @Prop({ enum: ApplicationStatus, default: ApplicationStatus.PENDING }) // ✅ Enum
  status!: ApplicationStatus;

  @Prop({ type: Types.ObjectId, ref: 'Job' }) // ✅ Full job reference
  job!: Job;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // ✅ Full candidate reference
  candidate!: User;
}

// ✅ Generate schema from class
export const ApplicationSchema = SchemaFactory.createForClass(Application);
