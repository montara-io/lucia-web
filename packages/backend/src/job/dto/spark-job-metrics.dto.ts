export class SparkJobMetricsDTO {
  id: string
  jobRunId: string
  avgUtilization: number
  avgRuntime: number
  avgWaitingTime: number
  avgCoreHours: number
  avgUsedMemory: number
  avgNumberOfCores: number
  avgCpuUtilization: number
  avgMemoryUtilization: number
  created: Date
  updated: Date
  deleted: boolean
}
