import { Column, Entity, PrimaryColumn } from 'typeorm'

export const JOB_RUN_TABLE_NAME = 'spark_job_run'
@Entity({ name: JOB_RUN_TABLE_NAME })
export class SparkJobRunEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false, primary: true })
  id: string

  @Column({ type: 'varchar' })
  job_id: string

  @Column({ type: 'varchar' })
  pipeline_id: string

  @Column({ type: 'varchar' })
  pipeline_run_id: string

  @Column({ type: 'int' })
  num_of_executors: number

  @Column({ type: 'float' })
  total_memory_per_executor: number

  @Column({ type: 'int' })
  total_bytes_read: number

  @Column({ type: 'int' })
  total_bytes_written: number

  @Column({ type: 'int' })
  total_shuffle_bytes_read: number

  @Column({ type: 'int' })
  total_shuffle_bytes_written: number

  @Column({ type: 'float' })
  total_cpu_time_used: number

  @Column({ type: 'float' })
  total_cpu_uptime: number

  @Column({ type: 'float' })
  peak_memory_usage: number

  @Column({ type: 'int' })
  total_cores_num: number

  @Column({ type: 'float' })
  cpu_utilization: number

  @Column({ type: 'timestamp', default: null })
  start_time: Date

  @Column({ type: 'timestamp', default: null })
  end_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date

  @Column({ type: 'boolean', default: false })
  deleted: boolean

  number_of_jobs?: number
}
