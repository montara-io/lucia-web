import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import { JobRunDTO } from './dto/job-run.dto'
import { GetJobRunsDTO as GetPipelineJobRunsDTO } from './dto/get-job-runs.dto'
import { SparkJobRunMetricsDTO } from './dto/spark-job-run-metrics.dto'
import { JobRepository } from './job.repository'
import { GetJobsDTO as GetJobRunsDTO } from './dto/get-jobs.dto'
import { JobDTO } from './dto/job.dto'
import { SparkJobMetricsDTO } from './dto/spark-job-metrics.dto'
import { SparkJobRunEntity } from '../entity/spark-job-run.entity'

@Injectable()
export class JobService {
  constructor(
    private readonly repository: JobRepository,
    @InjectPinoLogger(JobService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  async getPipelineJobRuns(dto: GetPipelineJobRunsDTO): Promise<JobRunDTO[]> {
    const jobEntities: SparkJobRunEntity[] = await this.repository.findPipelineJobRuns(dto.pipelineRunId)

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find job runs entities for pipeline runs')
      return null
    }

    return jobEntities.map((jobEntity) => this.convertJobEntityToJobRunDto(jobEntity))
  }

  async getJobRunsById(dto: GetJobRunsDTO): Promise<JobRunDTO[]> {
    const jobEntities: SparkJobRunEntity[] = await this.repository.findJobRunsByJobId(dto.jobId)

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find job runs entities for name %s', dto.jobId)
      return null
    }

    return jobEntities.map((jobEntity) => this.convertJobEntityToJobRunDto(jobEntity))
  }

  async getJobById(dto: GetJobRunsDTO): Promise<JobDTO> {
    const jobEntity: SparkJobRunEntity = await this.repository.findJob(dto.jobId)

    if (!jobEntity) {
      this.logger.info('cannot find job entities for job id %s', dto.jobId)
      return null
    }
    return this.onvertJobEntityToJobDto(jobEntity)
  }

  async getJobs(): Promise<JobDTO[]> {
    const jobEntities: SparkJobRunEntity[] = await this.repository.findJobs()

    if (!jobEntities || jobEntities.length === 0) {
      this.logger.info('cannot find jobs entities')
      return null
    }

    return jobEntities.map((jobEntity) => this.onvertJobEntityToJobDto(jobEntity))
  }

  convertJobEntityToJobRunDto(entity: SparkJobRunEntity): JobRunDTO {
    const jobDto = new JobRunDTO()
    const sparkJobMetricsDto = new SparkJobRunMetricsDTO()
    jobDto.sparkJobRunMetrics = sparkJobMetricsDto

    jobDto.id = entity.id
    jobDto.pipelineRunId = entity.pipeline_run_id
    jobDto.jobId = entity.job_id
    jobDto.date = entity.end_time
    jobDto.created = entity.created
    jobDto.updated = entity.updated
    jobDto.deleted = entity.deleted
    jobDto.sparkJobRunMetrics.numOfExecutors = entity.num_of_executors
    jobDto.sparkJobRunMetrics.cpuUtilization = entity.cpu_utilization
    jobDto.sparkJobRunMetrics.peakMemoryUsage = entity.peak_memory_usage
    jobDto.sparkJobRunMetrics.totalBytesRead = entity.total_bytes_read
    jobDto.sparkJobRunMetrics.totalBytesWritten = entity.total_bytes_written
    jobDto.sparkJobRunMetrics.totalCoresNum = entity.total_cores_num
    jobDto.sparkJobRunMetrics.totalCpuTimeUsed = entity.total_cpu_time_used
    jobDto.sparkJobRunMetrics.totalCpuUptime = entity.total_cpu_uptime
    jobDto.sparkJobRunMetrics.totalMemoryPerExecutor = entity.total_memory_per_executor
    jobDto.sparkJobRunMetrics.totalShuffleRead = entity.total_shuffle_read
    jobDto.sparkJobRunMetrics.totalShuffleWrite = entity.total_shuffle_write

    return jobDto
  }

  onvertJobEntityToJobDto(entity: SparkJobRunEntity): JobDTO {
    const jobDto = new JobDTO()
    const sparkJobMetricsDto = new SparkJobMetricsDTO()
    jobDto.sparkJobMetrics = sparkJobMetricsDto

    jobDto.id = entity.id
    jobDto.pipelineRunId = entity.pipeline_run_id
    jobDto.jobId = entity.job_id
    jobDto.date = entity.end_time
    jobDto.created = entity.created
    jobDto.updated = entity.updated
    jobDto.deleted = entity.deleted

    jobDto.sparkJobMetrics.avgNumOfExecutors = entity.num_of_executors
    jobDto.sparkJobMetrics.avgCpuUtilization = entity.cpu_utilization
    jobDto.sparkJobMetrics.avgPeakMemoryUsage = entity.peak_memory_usage
    jobDto.sparkJobMetrics.avgTotalBytesRead = entity.total_bytes_read
    jobDto.sparkJobMetrics.avgTotalBytesWritten = entity.total_bytes_written
    jobDto.sparkJobMetrics.avgTotalCoresNum = entity.total_cores_num
    jobDto.sparkJobMetrics.avgTotalCpuTimeUsed = entity.total_cpu_time_used
    jobDto.sparkJobMetrics.avgTotalCpuUptime = entity.total_cpu_uptime
    jobDto.sparkJobMetrics.avgTotalMemoryPerExecutor = entity.total_memory_per_executor
    jobDto.sparkJobMetrics.avgTotalShuffleRead = entity.total_shuffle_read
    jobDto.sparkJobMetrics.avgTotalShuffleWrite = entity.total_shuffle_write

    return jobDto
  }
}
