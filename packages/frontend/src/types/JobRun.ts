export type JobRun = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  startDate: string;
  endDate: string;
  duration: number;
  sparkJobRunMetrics?: {
    numOfExecutors: number;
    totalMemoryPerExecutor: number;
    totalBytesRead: number | string;
    totalBytesWritten: number | string;
    totalShuffleRead: number | string;
    totalShuffleWrite: number | string;
    totalCpuTimeUsed: number;
    totalCpuUptime: number;
    peakMemoryUsage: number;
    totalCoresNum: number;
    cpuUtilization: number;
  };
};
