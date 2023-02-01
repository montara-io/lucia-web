export type JobRun = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  startDate: string;
  endDate: string;
  duration: number;
  sparkJobRunMetrics?: {
    id: string;
    jobRunId: string;
    numOfExecutors: number;
    totalMemoryPerExecutor: number;
    totalBytesRead: number;
    totalBytesWritten: number;
    totalShuffleRead: number;
    totalShuffleWrite: number;
    totalCpuTimeUsed: number;
    totalCpuUptime: number;
    peakMemoryUsage: number;
    totalCoresNum: number;
    cpuUtilization: number;
  };
};
