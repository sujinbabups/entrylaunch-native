import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Application } from '../../applications/schema/application.schema';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

// ✅ Extend Document for Mongoose compatibility
export type JobDocument = Job & Document;

@Schema({ timestamps: true }) // ✅ Automatically creates `createdAt` & `updatedAt`
export class Job {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  company!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  salary!: string;

  @Prop({ enum: JobType, default: JobType.FULL_TIME })
  type!: JobType;

  @Prop({ type: String, required: true }) // ✅ Equivalent to `@Column('text')`
  description!: string;

  @Prop({ type: [String], default: [] }) // ✅ Equivalent to `@Column('simple-array')`
  requirements!: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // ✅ Reference to Employer (User)
  employerId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // ✅ Full employer data reference
  employer!: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Application' }] }) // ✅ Reference to Applications
  applications!: Application[];
}

// ✅ Generate schema from class
export const JobSchema = SchemaFactory.createForClass(Job);
