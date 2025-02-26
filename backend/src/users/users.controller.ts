import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

// ✅ Define AuthenticatedRequest correctly
interface AuthenticatedRequest extends ExpressRequest {
  user: { id: string }; // ✅ Change `number` to `string`
}

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get logged-in user profile' })
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id); 
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update logged-in user profile' })
  updateProfile(@Request() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto); 
  }
}
