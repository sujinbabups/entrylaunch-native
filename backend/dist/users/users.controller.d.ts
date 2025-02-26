import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: AuthenticatedRequest): Promise<import("./schema/user.schema").User>;
    updateProfile(req: AuthenticatedRequest, updateUserDto: UpdateUserDto): Promise<import("./schema/user.schema").User>;
}
export {};
