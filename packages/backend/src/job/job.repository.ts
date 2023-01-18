import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { JobRunEntity } from './entity/job.entity'
import { SparkJobMetricsEntity } from './entity/spark-job-metrics.entity'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { InjectDataSource } from '@nestjs/typeorm'

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

  async findPipelineJobRuns(pipelineRunId: string): Promise<JobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_run.id', 'id')
        .addSelect('job_run.job_id', 'job_id')
        .addSelect('job_run.pipeline_run_id', 'pipeline_run_id')
        .addSelect('spark_job_metrics.utilization', 'spark_job_metrics.utilization')
        .addSelect('spark_job_metrics.runtime', 'spark_job_metrics.runtime')
        .addSelect('spark_job_metrics.waiting_time', 'spark_job_metrics.waiting_time')
        .addSelect('spark_job_metrics.core_hours', 'spark_job_metrics.core_hours')
        .addSelect('spark_job_metrics.used_memory', 'spark_job_metrics.used_memory')
        .addSelect('spark_job_metrics.number_of_cores', 'spark_job_metrics.number_of_cores')
        .addSelect('spark_job_metrics.cpu_utilization', 'spark_job_metrics.cpu_utilization')
        .addSelect('spark_job_metrics.memory_utilization', 'spark_job_metrics.memory_utilization')
        .addSelect('job_run.date', 'date')
        .from(JobRunEntity, 'job_run')
        .leftJoin(
          SparkJobMetricsEntity,
          'spark_job_metrics',
          `spark_job_metrics.job_run_id = job_run.id AND spark_job_metrics.deleted = false`,
        )
        .where('job_run.pipeline_run_id = :pipelineRunId', { pipelineRunId })
        .andWhere('job_run.deleted = false')
        .addOrderBy('job_run.date', 'DESC')
      this.logger.debug('find pipeline job runs query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJobRunsByJobId(jobId: string): Promise<JobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_run.id', 'id')
        .addSelect('job_run.job_id', 'job_id')
        .addSelect('job_run.pipeline_run_id', 'pipeline_run_id')
        .addSelect('spark_job_metrics.utilization', 'spark_job_metrics.utilization')
        .addSelect('spark_job_metrics.runtime', 'spark_job_metrics.runtime')
        .addSelect('spark_job_metrics.waiting_time', 'spark_job_metrics.waiting_time')
        .addSelect('spark_job_metrics.core_hours', 'spark_job_metrics.core_hours')
        .addSelect('spark_job_metrics.used_memory', 'spark_job_metrics.used_memory')
        .addSelect('spark_job_metrics.number_of_cores', 'spark_job_metrics.number_of_cores')
        .addSelect('spark_job_metrics.cpu_utilization', 'spark_job_metrics.cpu_utilization')
        .addSelect('spark_job_metrics.memory_utilization', 'spark_job_metrics.memory_utilization')
        .addSelect('job_run.date', 'date')
        .from(JobRunEntity, 'job_run')
        .leftJoin(
          SparkJobMetricsEntity,
          'spark_job_metrics',
          `spark_job_metrics.job_run_id = job_run.id AND spark_job_metrics.deleted = false`,
        )
        .where('job_run.job_id = :jobId', { jobId })
        .andWhere('job_run.deleted = false')
        .addOrderBy('job_run.date', 'DESC')
      this.logger.debug('find jobs run by job id query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJob(jobId: string): Promise<JobRunEntity> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_run.job_id', 'job_id')
        .addSelect('AVG(spark_job_metrics.utilization)::INTEGER', 'spark_job_metrics.utilization')
        .addSelect('AVG(spark_job_metrics.runtime)::INTEGER', 'spark_job_metrics.runtime')
        .addSelect('AVG(spark_job_metrics.waiting_time)::INTEGER', 'spark_job_metrics.waiting_time')
        .addSelect('AVG(spark_job_metrics.core_hours)::INTEGER', 'spark_job_metrics.core_hours')
        .addSelect('AVG(spark_job_metrics.used_memory)::INTEGER', 'spark_job_metrics.used_memory')
        .addSelect('AVG(spark_job_metrics.number_of_cores)::INTEGER', 'spark_job_metrics.number_of_cores')
        .addSelect('AVG(spark_job_metrics.cpu_utilization)::INTEGER', 'spark_job_metrics.cpu_utilization')
        .addSelect('AVG(spark_job_metrics.memory_utilization)::INTEGER', 'spark_job_metrics.memory_utilization')
        .addSelect('max(date)', 'date')
        .from(JobRunEntity, 'job_run')
        .leftJoin(
          SparkJobMetricsEntity,
          'spark_job_metrics',
          `spark_job_metrics.job_run_id = job_run.id AND spark_job_metrics.deleted = false`,
        )
        .where('job_id = :jobId', { jobId })
        .where('job_run.deleted = false')
        .groupBy('job_id')
      this.logger.debug('find job by job id query %s', jobQuery.getQuery())
      return await jobQuery.getRawOne()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  async findJobs(): Promise<JobRunEntity[]> {
    try {
      const jobQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('job_run.job_id', 'job_id')
        .addSelect('AVG(spark_job_metrics.utilization)::INTEGER', 'spark_job_metrics.utilization')
        .addSelect('AVG(spark_job_metrics.waiting_time)::INTEGER', 'spark_job_metrics.waiting_time')
        .addSelect('AVG(spark_job_metrics.core_hours)::INTEGER', 'spark_job_metrics.core_hours')
        .addSelect('AVG(spark_job_metrics.runtime)::INTEGER', 'spark_job_metrics.runtime')
        .addSelect('AVG(spark_job_metrics.used_memory)::INTEGER', 'spark_job_metrics.used_memory')
        .addSelect('AVG(spark_job_metrics.number_of_cores)::INTEGER', 'spark_job_metrics.number_of_cores')
        .addSelect('AVG(spark_job_metrics.cpu_utilization)::INTEGER', 'spark_job_metrics.cpu_utilization')
        .addSelect('AVG(spark_job_metrics.memory_utilization)::INTEGER', 'spark_job_metrics.memory_utilization')
        .addSelect('max(date)', 'date')
        .from(JobRunEntity, 'job_run')
        .leftJoin(
          SparkJobMetricsEntity,
          'spark_job_metrics',
          `spark_job_metrics.job_run_id = job_run.id AND spark_job_metrics.deleted = false`,
        )
        .where('job_run.deleted = false')
        .groupBy('job_id')
        .addOrderBy('date', 'DESC')
      this.logger.debug('find jobs query %s', jobQuery.getQuery())
      return await jobQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }
}
