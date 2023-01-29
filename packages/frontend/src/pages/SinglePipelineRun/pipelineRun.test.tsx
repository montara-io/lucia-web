import { dataFormatterCallback, JobByPipelineRunIdResponse } from './helpers';
export const responseDataFallback: JobByPipelineRunIdResponse[] = [
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      id: 'asdasd',
      jobRunId: 'asdasd',
      numOfExecutors: 5,
      peakMemoryUsage: 5,
      totalBytesRead: 5,
      totalBytesWritten: 5,
      totalCoresNum: 5,
      totalCpuTimeUsed: 5,
      totalCpuUptime: 5,
      totalMemoryPerExecutor: 5,
      totalShuffleRead: 5,
      totalShuffleWrite: 5,
    },
  },
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      id: 'asdasd',
      jobRunId: 'asdasd',
      numOfExecutors: 5,
      peakMemoryUsage: 5,
      totalBytesRead: 5,
      totalBytesWritten: 5,
      totalCoresNum: 5,
      totalCpuTimeUsed: 5,
      totalCpuUptime: 5,
      totalMemoryPerExecutor: 5,
      totalShuffleRead: 5,
      totalShuffleWrite: 5,
    },
  },
];
describe('Pipeline Run component', () => {
  it('should format data correctly', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('jobId');
    expect(formatted.bodyData[0].totalBytesWritten).toBe('5 Bytes');
  });
});
