import { SparkJobRunMetricsDTO } from './spark-job-run-metrics.dto'

export class JobRunDTO {
  id: string
  pipelineRunId: string
  jobId: string
  date: Date
  created: Date
  updated: Date
  deleted: boolean
  sparkJobRunMetrics?: SparkJobRunMetricsDTO
}
