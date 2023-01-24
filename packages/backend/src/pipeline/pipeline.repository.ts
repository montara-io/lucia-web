import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { InjectDataSource } from '@nestjs/typeorm'
import { SparkJobRunEntity } from '../entity/spark-job-run.entity'

@Injectable()
export class PipelineRepository {
  constructor(
    @InjectPinoLogger(PipelineRepository.name)
    private readonly logger: Logger,
    @InjectDataSource('data_pipeline')
    private readonly dataSource: DataSource,
  ) {}

  manager() {
    return this.dataSource.manager
  }

  async findPipelinesSummary(): Promise<SparkJobRunEntity[]> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('pipeline_id', 'pipeline_id')
        .addSelect('COUNT(job_run_id)', 'number_of_jobs')
        .addSelect('AVG(num_of_executors)', 'num_of_executors')
        .addSelect('AVG(total_memory_per_executor)', 'total_memory_per_executor')
        .addSelect('AVG(total_bytes_read)', 'total_bytes_written')
        .addSelect('AVG(total_bytes_written)', 'total_bytes_written')
        .addSelect('AVG(total_shuffle_read)', 'total_shuffle_read')
        .addSelect('AVG(total_shuffle_write)', 'total_shuffle_write')
        .addSelect('AVG(total_cpu_time_used)', 'total_cpu_time_used')
        .addSelect('AVG(total_cpu_uptime)', 'total_cpu_uptime')
        .addSelect('AVG(peak_memory_usage)', 'peak_memory_usage')
        .addSelect('SUM(total_cores_num)', 'total_cores_num')
        .addSelect('AVG(cpu_utilization)', 'cpu_utilization')
        .addSelect('max(end_date)', 'end_date')
        .from(SparkJobRunEntity, 'spark_job_run')
        .where('deleted = false')
        .groupBy('pipeline_id')
      this.logger.debug('find pipeline summary query %s', pipelineQuery.getQuery())
      return await pipelineQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  public async findPipelineRuns(pipelineId: string): Promise<SparkJobRunEntity[]> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('COUNT(job_run_id)', 'number_of_jobs')
        .addSelect('AVG(num_of_executors)', 'num_of_executors')
        .addSelect('AVG(total_memory_per_executor)', 'total_memory_per_executor')
        .addSelect('AVG(total_bytes_read)', 'total_bytes_written')
        .addSelect('AVG(total_bytes_written)', 'total_bytes_written')
        .addSelect('AVG(total_shuffle_read)', 'total_shuffle_read')
        .addSelect('AVG(total_shuffle_write)', 'total_shuffle_write')
        .addSelect('AVG(total_cpu_time_used)', 'total_cpu_time_used')
        .addSelect('AVG(total_cpu_uptime)', 'total_cpu_uptime')
        .addSelect('AVG(peak_memory_usage)', 'peak_memory_usage')
        .addSelect('SUM(total_cores_num)', 'total_cores_num')
        .addSelect('AVG(cpu_utilization)', 'cpu_utilization')
        .addSelect('max(end_date)', 'end_date')
        .from(SparkJobRunEntity, 'spark_job_run')
        .where('pipeline_id = :pipelineId', { pipelineId })
        .andWhere('deleted = false')
        .addGroupBy('pipeline_run_id')
        .addOrderBy('end_date', 'ASC')
      this.logger.debug('find pipeline runs query %s', pipelineQuery.getQuery())
      return await pipelineQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  public async findPipelineById(pipelineId: string): Promise<SparkJobRunEntity> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('pipeline_id', 'pipeline_id')
        .addSelect('COUNT(job_run_id)', 'number_of_jobs')
        .addSelect('AVG(num_of_executors)', 'num_of_executors')
        .addSelect('AVG(total_memory_per_executor)', 'total_memory_per_executor')
        .addSelect('AVG(total_bytes_read)', 'total_bytes_written')
        .addSelect('AVG(total_bytes_written)', 'total_bytes_written')
        .addSelect('AVG(total_shuffle_read)', 'total_shuffle_read')
        .addSelect('AVG(total_shuffle_write)', 'total_shuffle_write')
        .addSelect('AVG(total_cpu_time_used)', 'total_cpu_time_used')
        .addSelect('AVG(total_cpu_uptime)', 'total_cpu_uptime')
        .addSelect('AVG(peak_memory_usage)', 'peak_memory_usage')
        .addSelect('SUM(total_cores_num)', 'total_cores_num')
        .addSelect('AVG(cpu_utilization)', 'cpu_utilization')
        .addSelect('max(end_date)', 'end_date')
        .from(SparkJobRunEntity, 'spark_job_run')
        .where('deleted = false')
        .where('pipeline_id = :pipelineId', { pipelineId })
        .groupBy('pipeline_id')
      this.logger.debug('find pipeline runs query %s', pipelineQuery.getQuery())
      const raw = await pipelineQuery.getRawMany()
      return await raw[0]
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }
}
