import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from '../../jobs/schema/job.schema';
import { Types } from 'mongoose';

export enum UserRole {
  CANDIDATE = 'candidate',
  EMPLOYER = 'employer',
}

// ✅ Extend Document for Mongoose compatibility
export type UserDocument = User & Document;

@Schema({ timestamps: true }) // ✅ Enables createdAt & updatedAt automatically
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: UserRole, default: UserRole.CANDIDATE })
  role!: UserRole;

  @Prop()
  title?: string;

  @Prop()
  location?: string;

  @Prop()
  about?: string;

  @Prop({ type: [String], default: [] }) // ✅ Array of strings
  skills?: string[];

  @Prop()
  resumeUrl?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Job' }] }) // ✅ Reference to Jobs
  postedJobs?: Job[];
}

// ✅ Generate schema from class
export const UserSchema = SchemaFactory.createForClass(User);
