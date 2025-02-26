import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchJobsDto } from './dto/search-jobs.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schema/user.schema';
import { Request as ExpressRequest } from 'express';

// ✅ Define the interface OUTSIDE the class
interface AuthenticatedRequest extends ExpressRequest {
  user: { id: string }; // ✅ Change from `number` to `string`
}

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job posting' })
  create(@Body() createJobDto: CreateJobDto, @Request() req: AuthenticatedRequest) {
    return this.jobsService.create(createJobDto, req.user.id); // ✅ No conversion needed
  }

  @Get()
  @ApiOperation({ summary: 'Search jobs' })
  findAll(@Query() searchDto: SearchJobsDto) {
    return this.jobsService.findAll(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by id' })
  findOne(@Param('id') id: string) { // ✅ Change `id` to `string`
    return this.jobsService.findOne(id); // ✅ Remove `+id`
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a job posting' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) { // ✅ Change `id` to `string`
    return this.jobsService.update(id, updateJobDto); // ✅ Remove `+id`
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a job posting' })
  remove(@Param('id') id: string) { // ✅ Change `id` to `string`
    return this.jobsService.remove(id); // ✅ Remove `+id`
  }
}
