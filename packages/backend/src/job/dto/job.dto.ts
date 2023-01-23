import { SparkJobMetricsDTO } from './spark-job-metrics.dto'

export class JobDTO {
  id: string
  pipelineRunId: string
  jobId: string
  date: Date
  created: Date
  updated: Date
  deleted: boolean
  sparkJobMetrics?: SparkJobMetricsDTO
}
