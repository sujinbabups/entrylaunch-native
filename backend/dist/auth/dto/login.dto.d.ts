import { UserRole } from '../../users/schema/user.schema';
export declare class LoginDto {
    email: string;
    password: string;
    role: UserRole;
}
