import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { SparkJobMetricsEntity } from './spark-job-metrics.entity'

export const JOB_RUN_TABLE_NAME = 'job_run'
@Entity({ name: JOB_RUN_TABLE_NAME })
export class JobRunEntity {
  @Column({ type: 'varcar' })
  id: string

  @Column({ type: 'uuid' })
  job_run_id: string

  @Column({ type: 'int', default: 0 })
  utilization: number

  @Column({ type: 'int', default: 0 })
  runtime: number

  @Column({ type: 'int', default: 0 })
  waiting_time: number

  @Column({ type: 'int', default: 0 })
  core_hours: number

  @Column({ type: 'int', default: 0 })
  used_memory: number

  @Column({ type: 'int', default: 0 })
  number_of_cores: number

  @Column({ type: 'int', default: 0 })
  cpu_utilization: number

  @Column({ type: 'int', default: 0 })
  memory_utilization: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date

  @Column({ type: 'boolean', default: false })
  deleted: boolean
}
