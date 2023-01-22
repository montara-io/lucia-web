export class PipelineRunDTO {
  id: string
  pipelineId: string
  totalRuntime = 0
  numberOfJobs = 0
  totalCoreHours = 0
  avgWaitingTime = 0
  avgUtilization = 0
  avgCpuUtilization = 0
  avgMemoryUtilization = 0
  deleted = false
  date: Date
  created: Date
  updated: Date
}

export class PipelineDTO {
  id: string
  pipelineId: string
  avgRuntime: number
  numberOfJobs: number
  totalCoreHours: number
  avgWaitingTime: number
  avgUtilization: number
  avgCpuUtilization: number
  avgMemoryUtilization: number
  date: Date
}
