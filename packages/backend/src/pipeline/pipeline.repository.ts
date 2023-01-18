import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { PipelineRunEntity } from './entity/pipeline.entity'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { InjectDataSource } from '@nestjs/typeorm'

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

  async findPipelinesSummary(): Promise<PipelineRunEntity[]> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('pipeline_id', 'pipeline_id')
        .addSelect('SUM(total_runtime)::INTEGER', 'total_runtime')
        .addSelect('SUM(number_of_jobs)::INTEGER', 'number_of_jobs')
        .addSelect('SUM(total_core_hours)::INTEGER', 'total_core_hours')
        .addSelect('AVG(avg_waiting_time)::INTEGER', 'avg_waiting_time')
        .addSelect('AVG(avg_utilization)::INTEGER', 'avg_utilization')
        .addSelect('AVG(avg_cpu_utilization)::INTEGER', 'avg_cpu_utilization')
        .addSelect('AVG(avg_memory_utilization)::INTEGER', 'avg_memory_utilization')
        .addSelect('max(date)', 'date')
        .from(PipelineRunEntity, 'pipeline_run')
        .where('deleted = false')
        .groupBy('pipeline_id')
      this.logger.debug('find pipeline summary query %s', pipelineQuery.getQuery())
      return await pipelineQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  public async findPipelineRuns(pipelineId: string): Promise<PipelineRunEntity[]> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('id', 'id')
        .addSelect('pipeline_id', 'pipeline_id')
        .addSelect('total_runtime', 'total_runtime')
        .addSelect('number_of_jobs', 'number_of_jobs')
        .addSelect('total_core_hours', 'total_core_hours')
        .addSelect('avg_waiting_time', 'avg_waiting_time')
        .addSelect('avg_utilization', 'avg_utilization')
        .addSelect('avg_cpu_utilization', 'avg_cpu_utilization')
        .addSelect('avg_memory_utilization', 'avg_memory_utilization')
        .addSelect('date', 'date')
        .from(PipelineRunEntity, 'pipeline_run')
        .where('pipeline_id = :pipelineId', { pipelineId })
        .andWhere('deleted = false')
        .addOrderBy('date', 'ASC')
      this.logger.debug('find pipeline runs query %s', pipelineQuery.getQuery())
      return await pipelineQuery.getRawMany()
    } catch (e) {
      this.logger.error(e)
      return null
    }
  }

  public async findPipelineById(pipelineId: string): Promise<PipelineRunEntity> {
    try {
      const pipelineQuery = this.dataSource.manager
        .createQueryBuilder()
        .addSelect('pipeline_id', 'pipeline_id')
        .addSelect('SUM(total_runtime)::INTEGER', 'total_runtime')
        .addSelect('SUM(number_of_jobs)::INTEGER', 'number_of_jobs')
        .addSelect('SUM(total_core_hours)::INTEGER', 'total_core_hours')
        .addSelect('AVG(avg_waiting_time)::INTEGER', 'avg_waiting_time')
        .addSelect('AVG(avg_utilization)::INTEGER', 'avg_utilization')
        .addSelect('AVG(avg_cpu_utilization)::INTEGER', 'avg_cpu_utilization')
        .addSelect('AVG(avg_memory_utilization)::INTEGER', 'avg_memory_utilization')
        .addSelect('max(date)', 'date')
        .from(PipelineRunEntity, 'pipeline_run')
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
