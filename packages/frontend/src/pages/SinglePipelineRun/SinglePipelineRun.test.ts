import { JobRun } from '../../types/JobRun';
import { dataFormatterCallback } from './helpers';
export const responseDataFallback: JobRun[] = [
  {
    startDate: '2022-09-05T08:23:25.960Z',
    endDate: '2022-09-05T08:23:25.960Z',
    duration: 5,
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
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
      cpuUtilization: 5,
    },
  },
  {
    startDate: '2022-09-05T08:23:25.960Z',
    endDate: '2022-09-05T08:23:25.960Z',
    duration: 5,
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
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
      cpuUtilization: 5,
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
