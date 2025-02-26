import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schema/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class ApplicationsService {
    private applicationsRepository;
    constructor(applicationsRepository: Model<ApplicationDocument>);
    create(createApplicationDto: CreateApplicationDto, candidateId: string): Promise<Application>;
    findAllByCandidate(candidateId: string): Promise<Application[]>;
    findAllByEmployer(employerId: string): Promise<Application[]>;
    updateStatus(id: string, updateStatusDto: UpdateApplicationStatusDto): Promise<Application>;
}
