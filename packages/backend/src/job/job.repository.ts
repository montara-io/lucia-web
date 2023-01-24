import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { InjectDataSource } from '@nestjs/typeorm'
import { SparkJobRunEntity } from './entity/spark-job-run.entity'

@Injectable()
export class JobRepository {
  constructor(
    private readonly configService: ConfigService,
    @InjectPinoLogger(JobRepository.name)
    private readonly logger: Logger,
    @InjectDataSource('data_pipeline')
    private readonly dataSource: DataSource,
  ) {}

  manager() {
    return this.dataSource.manager
  }

  async findPipelineJobRuns(pipelineRunId: string): Promise<SparkJobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('id', 'id')
        .addSelect('job_id', 'job_id')
        .addSelect('pipeline_run_id', 'pipeline_run_id')
        .addSelect('num_of_executors', 'num_of_executors')
        .addSelect('total_memory_per_executor', 'total_memory_per_executor')
        .addSelect('total_bytes_read', 'total_bytes_written')
        .addSelect('total_bytes_written', 'total_bytes_written')
        .addSelect('total_shuffle_read', 'total_shuffle_read')
        .addSelect('total_shuffle_write', 'total_shuffle_write')
        .addSelect('total_cpu_time_used', 'total_cpu_time_used')
        .addSelect('total_cpu_uptime', 'total_cpu_uptime')
        .addSelect('peak_memory_usage', 'peak_memory_usage')
        .addSelect('total_cores_num', 'total_cores_num')
        .addSelect('cpu_utilization', 'cpu_utilization')
        .addSelect('start_time', 'start_time')
        .addSelect('end_time', 'end_time')
        .from(SparkJobRunEntity, 'spark_job_run')
        .where('pipeline_run_id = :pipelineRunId', { pipelineRunId })
        .andWhere('deleted = false')
        .addOrderBy('end_date', 'DESC')
      this.logger.debug('find pipeline job runs query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJobRunsByJobId(jobId: string): Promise<SparkJobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('id', 'id')
        .addSelect('job_id', 'job_id')
        .addSelect('pipeline_run_id', 'pipeline_run_id')
        .addSelect('num_of_executors', 'num_of_executors')
        .addSelect('total_memory_per_executor', 'total_memory_per_executor')
        .addSelect('total_bytes_read', 'total_bytes_written')
        .addSelect('total_bytes_written', 'total_bytes_written')
        .addSelect('total_shuffle_read', 'total_shuffle_read')
        .addSelect('total_shuffle_write', 'total_shuffle_write')
        .addSelect('total_cpu_time_used', 'total_cpu_time_used')
        .addSelect('total_cpu_uptime', 'total_cpu_uptime')
        .addSelect('peak_memory_usage', 'peak_memory_usage')
        .addSelect('total_cores_num', 'total_cores_num')
        .addSelect('cpu_utilization', 'cpu_utilization')
        .addSelect('start_time', 'start_time')
        .addSelect('end_time', 'end_time')
        .from(SparkJobRunEntity, 'sparkjob_run')
        .where('job_id = :jobId', { jobId })
        .andWhere('deleted = false')
        .addOrderBy('end_date', 'DESC')
      this.logger.debug('find jobs run by job id query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJob(jobId: string): Promise<SparkJobRunEntity> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_id', 'job_id')
        .addSelect('AVG(num_of_executors)', 'num_of_executors')
        .addSelect('AVG(total_memory_per_executor)', 'total_memory_per_executor')
        .addSelect('AVG(total_bytes_read)', 'total_bytes_written')
        .addSelect('AVG(total_bytes_written)', 'total_bytes_written')
        .addSelect('AVG(total_shuffle_read)', 'total_shuffle_read')
        .addSelect('AVG(total_shuffle_write)', 'total_shuffle_write')
        .addSelect('AVG(total_cpu_time_used)', 'total_cpu_time_used')
        .addSelect('AVG(total_cpu_uptime)', 'total_cpu_uptime')
        .addSelect('AVG(peak_memory_usage)', 'peak_memory_usage')
        .addSelect('AVG(total_cores_num)', 'total_cores_num')
        .addSelect('AVG(cpu_utilization)', 'cpu_utilization')
        .from(SparkJobRunEntity, 'sparkjob_run')
        .where('job_id = :jobId', { jobId })
        .where('deleted = false')
        .groupBy('job_id')
      this.logger.debug('find job by job id query %s', jobQuery.getQuery())
      return await jobQuery.getRawOne()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJobs(): Promise<SparkJobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_id', 'job_id')
        .addSelect('AVG(num_of_executors)', 'num_of_executors')
        .addSelect('AVG(total_memory_per_executor)', 'total_memory_per_executor')
        .addSelect('AVG(total_bytes_read)', 'total_bytes_written')
        .addSelect('AVG(total_bytes_written)', 'total_bytes_written')
        .addSelect('AVG(total_shuffle_read)', 'total_shuffle_read')
        .addSelect('AVG(total_shuffle_write)', 'total_shuffle_write')
        .addSelect('AVG(total_cpu_time_used)', 'total_cpu_time_used')
        .addSelect('AVG(total_cpu_uptime)', 'total_cpu_uptime')
        .addSelect('AVG(peak_memory_usage)', 'peak_memory_usage')
        .addSelect('AVG(total_cores_num)', 'total_cores_num')
        .addSelect('AVG(cpu_utilization)', 'cpu_utilization')
        .addSelect('max(start_time)', 'start_time')
        .where('deleted = false')
        .groupBy('job_id')
        .addOrderBy('end_date', 'DESC')
      this.logger.debug('find jobs query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }
}
