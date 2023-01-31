import { formatOverview, PipelineRunResponse } from './helpers';

describe('Pipeline runs', () => {
  const mockResponse: PipelineRunResponse[] = [
    {
      pipelineRunId: 'pipeline1-11',
      avgNumOfExecutors: 1,
      avgCpuUtilization: 2,
      avgPeakMemoryUsage: 0,
      avgTotalBytesRead: 1979173,
      avgTotalBytesWritten: 0,
      avgTotalCoresNum: 1,
      avgTotalCpuTimeUsed: 0,
      avgTotalCpuUptime: 4,
      avgTotalMemoryPerExecutor: 0,
      avgTotalShuffleRead: 0,
      avgTotalShuffleWrite: 0,
      numberOfJobs: 1,
      startDate: '2023-01-26T12:27:21.459Z',
      endDate: '2023-01-26T12:27:26.190Z',
      duration: 0.07885,
    },
    {
      pipelineRunId: 'pipeline1-12',
      avgNumOfExecutors: 1,
      avgCpuUtilization: 2,
      avgPeakMemoryUsage: 0,
      avgTotalBytesRead: 1979173,
      avgTotalBytesWritten: 0,
      avgTotalCoresNum: 1,
      avgTotalCpuTimeUsed: 0,
      avgTotalCpuUptime: 4,
      avgTotalMemoryPerExecutor: 0,
      avgTotalShuffleRead: 0,
      avgTotalShuffleWrite: 0,
      numberOfJobs: 1,
      startDate: '2023-01-26T12:27:21.459Z',
      endDate: '2023-01-26T12:27:26.190Z',
      duration: 0.07885,
    },
  ];
  it('should format overview', () => {
    const result = formatOverview(mockResponse);
    const avgDuration = result.find((s) => s.title === 'Avg. Duration')?.score;
    expect(avgDuration).toBe('4 Mins.');
  });
});
