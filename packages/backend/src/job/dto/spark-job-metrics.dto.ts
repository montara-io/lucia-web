export class SparkJobMetricsDTO {
  id: string
  jobRunId: string
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
}
