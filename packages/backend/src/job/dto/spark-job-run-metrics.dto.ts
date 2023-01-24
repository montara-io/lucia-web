export class SparkJobRunMetricsDTO {
  id: string
  jobRunId: string
  numOfExecutors: number
  totalMemoryPerExecutor: number
  totalBytesRead: number
  totalBytesWritten: number
  totalShuffleRead: number
  totalShuffleWrite: number
  totalCpuTimeUsed: number
  totalCpuUptime: number
  peakMemoryUsage: number
  totalCoresNum: number
  cpuUtilization: number
  startDate: Date
  endDate: Date
}
