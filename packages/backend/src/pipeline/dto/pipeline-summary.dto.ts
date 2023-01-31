export class PipelineSummaryDTO {
  pipelineId: string
  lastRunDate: Date
  numberOfJobs: number
  avgRuntime: number
  lastRunRuntime: number
}
