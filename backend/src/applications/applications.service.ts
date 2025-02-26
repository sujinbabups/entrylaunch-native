import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument } from './schema/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationsRepository: Model<ApplicationDocument>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, candidateId: string): Promise<Application> {
    const jobId = new Types.ObjectId(createApplicationDto.jobId); // ✅ Convert jobId to ObjectId
    const candidateObjectId = new Types.ObjectId(candidateId); // ✅ Convert candidateId to ObjectId

    const existingApplication = await this.applicationsRepository.findOne({
      jobId: jobId,
      candidateId: candidateObjectId,
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied for this job');
    }

    const application = new this.applicationsRepository({
      ...createApplicationDto,
      jobId: jobId,
      candidateId: candidateObjectId,
    });

    return application.save();
  }

  async findAllByCandidate(candidateId: string): Promise<Application[]> {
    return this.applicationsRepository
      .find({ candidateId: new Types.ObjectId(candidateId) }) // ✅ Convert candidateId
      .populate('job') // ✅ Populate related Job data
      .exec();
  }

  async findAllByEmployer(employerId: string): Promise<Application[]> {
    return this.applicationsRepository
      .find()
      .populate({
        path: 'job',
        match: { employerId: new Types.ObjectId(employerId) }, // ✅ Convert employerId
      })
      .populate('candidate')
      .exec();
  }

  async updateStatus(id: string, updateStatusDto: UpdateApplicationStatusDto): Promise<Application> {
    const application = await this.applicationsRepository.findById(id);

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    application.status = updateStatusDto.status;
    return application.save();
  }
}
