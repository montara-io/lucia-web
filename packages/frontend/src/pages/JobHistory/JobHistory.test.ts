import { formatOverview, formatLineChartData, JobRun } from './helpers';

const jobsMock: JobRun[] = [
  {
    pipelineRunId: 'Monty Python',
    jobId: 'Cohort',
    date: '2022-09-05T08:23:25.960Z',
    sparkJobRunMetrics: {
      jobRunId: 'Monty Python',
      utilization: 20,
      runtime: 20,
      waitingTime: 20,
      coreHours: 20,
      usedMemory: 20,
      numberOfCores: 20,
      cpuUtilization: 20,
      memoryUtilization: 20,
    },
  },
  {
    pipelineRunId: 'Monty Python',
    jobId: 'Cohort',
    date: '2022-09-05T08:23:25.960Z',
    sparkJobRunMetrics: {
      jobRunId: 'Monty Python',
      utilization: 80,
      runtime: 20,
      waitingTime: 50,
      coreHours: 20,
      usedMemory: 20,
      numberOfCores: 20,
      cpuUtilization: 20,
      memoryUtilization: 20,
    },
  },
];

describe('Job History', () => {
  it('should format overview items', () => {
    const result = formatOverview(jobsMock);
    expect(result[0].score).toBe(2);
  });
  it('should format the line chart data', () => {
    const result = formatLineChartData(jobsMock);
    expect(result).toHaveLength(4);
  });
});
