import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { SparkJobMetricsEntity } from './spark-job-metrics.entity'

export const JOB_RUN_TABLE_NAME = 'job_run'
@Entity({ name: JOB_RUN_TABLE_NAME })
export class JobRunEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string

  @Column({ type: 'uuid' })
  pipeline_run_id: string

  @Column({ type: 'uuid' })
  spark_job_metrics_id: string

  @Column({ type: 'varchar' })
  job_id: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date

  @Column({ type: 'boolean', default: false })
  deleted: boolean

  spark_job_metrics?: SparkJobMetricsEntity
}
