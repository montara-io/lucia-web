import { dataFormatterCallback, PipelineAllResponse } from './helpers';
const responseDataFallback: PipelineAllResponse[] = [
  {
    id: 'Monty Grail',
    pipelineId: 'Monty Grail',

    avgRuntime: 20,
    avgCpuUtilization: 50,
    avgPeakMemoryUsage: 50,
    avgTotalCpuTimeUsed: 50,
    avgTotalCpuUptime: 50,
    avgTotalCoresNum: 50,
    avgTotalMemoryPerExecutor: 50,
    avgTotalBytesRead: 50,
    avgTotalBytesWritten: 50,
    avgTotalShuffleRead: 50,
    avgTotalShuffleWrite: 50,
    avgNumOfExecutors: 50,
    numberOfJobs: 3,
    startDate: '2022-09-05T08:23:25.960Z',
    endDate: '2022-09-05T08:23:25.960Z',
    duration: 2,
  },
  {
    id: 'Monty Python',
    pipelineId: 'Monty Python',

    avgRuntime: 20,
    avgCpuUtilization: 50,
    avgPeakMemoryUsage: 50,
    avgTotalCpuTimeUsed: 50,
    avgTotalCpuUptime: 50,
    avgTotalCoresNum: 50,
    avgTotalMemoryPerExecutor: 50,
    avgTotalBytesRead: 50,
    avgTotalBytesWritten: 50,
    avgTotalShuffleRead: 50,
    avgTotalShuffleWrite: 50,
    avgNumOfExecutors: 50,
    numberOfJobs: 3,
    startDate: '2022-09-05T08:23:25.960Z',
    endDate: '2022-09-05T08:23:25.960Z',
    duration: 2,
  },
];
describe('data formatting', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('pipelineId');
  });
});
