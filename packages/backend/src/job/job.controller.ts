import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JobRunDTO } from './dto/job-run.dto'
import { GetJobRunsDTO } from './dto/get-job-runs.dto'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { JobService } from './job.service'
import { GetJobsDTO } from './dto/get-jobs.dto'

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    @InjectPinoLogger(JobController.name)
    private readonly logger: Logger,
  ) {}

  @Get('/')
  async getJob(@Query(ValidationPipe) query: GetJobsDTO): Promise<JobRunDTO> {
    this.logger.debug('getting job by id')
    const response = await this.jobService.getJobById(query)
    this.logger.debug('get job by id: %o', response)

    return response
  }

  @Get('/all')
  async getJobs(): Promise<JobRunDTO[]> {
    this.logger.debug('getting jobs')
    const response = await this.jobService.getJobs()
    this.logger.debug('getting jobs response: %o', response)

    return response
  }

  @Get('/runs/by-job-id')
  async getJobRunsByName(@Query(ValidationPipe) query: GetJobsDTO): Promise<JobRunDTO[]> {
    this.logger.debug('getting job runs by id')
    const response = await this.jobService.getJobRunsById(query)
    this.logger.debug('get job runs by id  response: %o', response)

    return response
  }

  @Get('/runs/by-pipeline-run-id')
  async getPipelineJobRuns(@Query(ValidationPipe) query: GetJobRunsDTO): Promise<JobRunDTO[]> {
    this.logger.debug('getting pipeline job runs')
    const response = await this.jobService.getPipelineJobRuns(query)
    this.logger.debug('get pipeline job runs response: %o', response)

    return response
  }
}
