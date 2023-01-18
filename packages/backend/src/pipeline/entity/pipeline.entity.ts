import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

export const PIPELINE_RUN_TABLE_NAME = 'pipeline_run'
@Entity({ name: PIPELINE_RUN_TABLE_NAME })
export class PipelineRunEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string

  @Column({ type: 'varchar' })
  pipeline_id: string

  @Column({ type: 'int', default: 0 })
  total_runtime: number

  @Column({ type: 'int', default: 0 })
  number_of_jobs: number

  @Column({ type: 'int', default: 0 })
  total_core_hours: number

  @Column({ type: 'int', default: 0 })
  avg_waiting_time: number

  @Column({ type: 'int', default: 0 })
  avg_utilization: number

  @Column({ type: 'int', default: 0 })
  avg_cpu_utilization: number

  @Column({ type: 'int', default: 0 })
  avg_memory_utilization: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date

  @Column({ type: 'boolean', default: false })
  deleted: boolean
}
