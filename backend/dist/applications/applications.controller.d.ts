import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UserRole } from '../users/schema/user.schema';
interface RequestWithUser {
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(createApplicationDto: CreateApplicationDto, req: RequestWithUser): Promise<import("./schema/application.schema").Application>;
    findAllForCandidate(req: RequestWithUser): Promise<import("./schema/application.schema").Application[]>;
    findAllForEmployer(req: RequestWithUser): Promise<import("./schema/application.schema").Application[]>;
    updateStatus(id: string, updateStatusDto: UpdateApplicationStatusDto): Promise<import("./schema/application.schema").Application>;
}
export {};
