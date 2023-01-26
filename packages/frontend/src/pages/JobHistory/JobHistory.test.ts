import { formatOverview, formatLineChartData, JobRun } from './helpers';

const jobsMock: JobRun[] = [
  {
    id: 'Monty Python',
    pipelineRunId: 'Monty Python',
    jobId: 'Cohort',
    date: '2022-09-05T08:23:25.960Z',
    sparkJobRunMetrics: {
      id: 'Monty Python',
      jobRunId: 'Monty Python',
      numOfExecutors: 20,
      totalMemoryPerExecutor: 20,
      totalBytesRead: 20,
      totalBytesWritten: 20,
      totalShuffleRead: 20,
      totalShuffleWrite: 20,
      totalCpuTimeUsed: 20,
      totalCpuUptime: 20,
      peakMemoryUsage: 20,
      totalCoresNum: 20,
      cpuUtilization: 20,
    },
  },
];

describe('Job History', () => {
  it('should format overview items', () => {
    const result = formatOverview(jobsMock);
    expect(result[0].score).toBe(1);
  });
  it('should format the line chart data', () => {
    const result = formatLineChartData(jobsMock);
    expect(result).toHaveLength(3);
  });
});
