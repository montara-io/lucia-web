export class PipelineRunDTO {
  id: string
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
  date: Date
}
