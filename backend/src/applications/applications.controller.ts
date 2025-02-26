import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schema/user.schema';

interface RequestWithUser {
  user: {
    id: string; // ✅ MongoDB uses string _id
    email: string;
    role: UserRole;
  };
}

@ApiTags('applications')
@Controller('applications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Roles(UserRole.CANDIDATE)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Apply for a job' })
  create(@Body() createApplicationDto: CreateApplicationDto, @Request() req: RequestWithUser) {
    return this.applicationsService.create(createApplicationDto, req.user.id); // ✅ Now `id` is a string
  }

  @Get('candidate')
  @Roles(UserRole.CANDIDATE)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all applications for the logged-in candidate' })
  findAllForCandidate(@Request() req: RequestWithUser) {
    return this.applicationsService.findAllByCandidate(req.user.id); // ✅ Now `id` is a string
  }

  @Get('employer')
  @Roles(UserRole.EMPLOYER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all applications for the employer\'s job postings' })
  findAllForEmployer(@Request() req: RequestWithUser) {
    return this.applicationsService.findAllByEmployer(req.user.id); // ✅ Now `id` is a string
  }

  @Put(':id/status')
  @Roles(UserRole.EMPLOYER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update application status' })
  updateStatus(
    @Param('id') id: string, // ✅ Ensure `id` is a string
    @Body() updateStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateStatus(id, updateStatusDto); // ✅ No need for `+id`, MongoDB uses strings
  }
}
