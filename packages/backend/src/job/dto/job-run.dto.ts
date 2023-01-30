import { SparkJobRunMetricsDTO } from './spark-job-run-metrics.dto'

export class JobRunDTO {
  id: string
  pipelineRunId: string
  jobId: string
  startDate: Date
  endDate: Date
  duration: number
  sparkJobRunMetrics?: SparkJobRunMetricsDTO
}
