export class PipelineSummaryDTO {
  pipelineId: string
  lastRunDate: Date
  numberOfJobs: number
  avgDuration: number
  lastRunDuration: number
}
