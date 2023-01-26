import { dataFormatterCallback, JobAllResponse } from './helpers';

const responseDataFallback: JobAllResponse[] = [
  {
    jobId: 'Cohort',
    pipelineRunId: 'asdasd',
    date: '2022-09-05T08:23:25.960Z',
    id: 'Cohort',
    sparkJobMetrics: {
      jobRunId: 'asdasd',
      avgNumOfExecutors: 5,
      avgTotalMemoryPerExecutor: 5,
      avgTotalBytesRead: 5,
      avgTotalBytesWritten: 5,
      avgTotalShuffleRead: 5,
      avgTotalShuffleWrite: 5,
      avgTotalCpuTimeUsed: 5,
      avgTotalCpuUptime: 5,
      avgPeakMemoryUsage: 5,
      avgTotalCoresNum: 5,
      avgCpuUtilization: 5,
    },
  },
  {
    jobId: 'Feature engine',
    pipelineRunId: 'asdasd',
    date: '2022-09-05T08:23:25.960Z',
    id: 'Cohort',
    sparkJobMetrics: {
      jobRunId: 'asdasd',
      avgNumOfExecutors: 5,
      avgTotalMemoryPerExecutor: 5,
      avgTotalBytesRead: 5,
      avgTotalBytesWritten: 5,
      avgTotalShuffleRead: 5,
      avgTotalShuffleWrite: 5,
      avgTotalCpuTimeUsed: 5,
      avgTotalCpuUptime: 5,
      avgPeakMemoryUsage: 5,
      avgTotalCoresNum: 5,
      avgCpuUtilization: 5,
    },
  },
];
describe('Jobs Page', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('jobId');
  });
});
