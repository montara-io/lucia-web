import { SparkJobMetricsDTO } from './spark-job-metrics.dto'

export class JobDTO {
  id: string
  pipelineRunId: string
  jobId: string
  startDate: Date
  endDate: Date
  duration: number
  sparkJobMetrics?: SparkJobMetricsDTO
}
