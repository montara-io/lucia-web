export class SparkJobRunMetricsDTO {
  id: string
  jobRunId: string
  utilization: number
  runtime: number
  waitingTime: number
  coreHours: number
  usedMemory: number
  numberOfCores: number
  cpuUtilization: number
  memoryUtilization: number
  created: Date
  updated: Date
  deleted: boolean
}
