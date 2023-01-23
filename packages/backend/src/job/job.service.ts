import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import { JobRunEntity } from './entity/job.entity'
import { JobRunDTO } from './dto/job-run.dto'
import { GetJobRunsDTO as GetPipelineJobRunsDTO } from './dto/get-job-runs.dto'
import { SparkJobMetricsDTO } from './dto/spark-job-metrics.dto'
import { JobRepository } from './job.repository'
import { GetJobsDTO as GetJobRunsDTO } from './dto/get-jobs.dto'

@Injectable()
export class JobService {
  constructor(
    private readonly repository: JobRepository,
    @InjectPinoLogger(JobService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  async getPipelineJobRuns(dto: GetPipelineJobRunsDTO): Promise<JobRunDTO[]> {
    const jobEntities: JobRunEntity[] = await this.repository.findPipelineJobRuns(dto.pipelineRunId)

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find job runs entities for pipeline runs')
      return null
    }

    return jobEntities.map((jobEntity) => this.convertJobEntityToDto(jobEntity))
  }

  async getJobRunsById(dto: GetJobRunsDTO): Promise<JobRunDTO[]> {
    const jobEntities: JobRunEntity[] = await this.repository.findJobRunsByJobId(dto.jobId)

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find job runs entities for name %s', dto.jobId)
      return null
    }

    return jobEntities.map((jobEntity) => this.convertJobEntityToDto(jobEntity))
  }

  async getJobById(dto: GetJobRunsDTO): Promise<JobRunDTO> {
    const jobEntity: JobRunEntity = await this.repository.findJob(dto.jobId)

    if (!jobEntity) {
      this.logger.info('cannot find job entities for job id %s', dto.jobId)
      return null
    }
    return this.convertJobEntityToDto(jobEntity)
  }

  async getJobs(): Promise<JobRunDTO[]> {
    const jobEntities: JobRunEntity[] = await this.repository.findJobs()

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find jobs entities')
      return null
    }

    return jobEntities.map((jobEntity) => this.convertJobEntityToDto(jobEntity))
  }

  convertJobEntityToDto(entity: JobRunEntity): JobRunDTO {
    const jobDto = new JobRunDTO()
    const sparkJobMetricsDto = new SparkJobMetricsDTO()
    jobDto.sparkJobMetrics = sparkJobMetricsDto

    jobDto.id = entity.id
    jobDto.pipelineRunId = entity.pipeline_run_id
    jobDto.jobId = entity.job_id
    jobDto.date = entity.date
    jobDto.created = entity.created
    jobDto.updated = entity.updated
    jobDto.deleted = entity.deleted
    jobDto.sparkJobMetrics.avgCoreHours = entity['spark_job_metrics.core_hours']
    jobDto.sparkJobMetrics.avgWaitingTime = entity['spark_job_metrics.waiting_time']
    jobDto.sparkJobMetrics.avgUtilization = entity['spark_job_metrics.utilization']
    jobDto.sparkJobMetrics.avgCpuUtilization = entity['spark_job_metrics.cpu_utilization']
    jobDto.sparkJobMetrics.avgMemoryUtilization = entity['spark_job_metrics.memory_utilization']
    jobDto.sparkJobMetrics.avgNumberOfCores = entity['spark_job_metrics.number_of_cores']
    jobDto.sparkJobMetrics.avgUsedMemory = entity['spark_job_metrics.used_memory']
    jobDto.sparkJobMetrics.avgRuntime = entity['spark_job_metrics.runtime']

    return jobDto
  }
}
