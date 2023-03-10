export class PipelineRunDTO {
  pipelineRunId: string
  pipelineId: string
  numberOfJobs: number
  avgNumOfExecutors: number
  avgTotalMemoryPerExecutor: number
  avgTotalBytesRead: number
  avgTotalBytesWritten: number
  avgTotalShuffleRead: number
  avgTotalShuffleWrite: number
  avgTotalCpuTimeUsed: number
  avgTotalCpuUptime: number
  avgPeakMemoryUsage: number
  avgTotalCoresNum: number
  avgCpuUtilization: number
  startDate: Date
  endDate: Date
  duration: number
}
