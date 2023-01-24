import { dataFormatterCallback, JobByPipelineRunIdResponse } from './helpers';
export const responseDataFallback: JobByPipelineRunIdResponse[] = [
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      coreHours: 5,
      cpuUtilization: 50,
      id: 'asdasd',
      jobRunId: 'asdasd',
      memoryUtilization: 50,
      numberOfCores: 5,
      runtime: 5,
      utilization: 50,
      usedMemory: 5,
      waitingTime: 5,
    },
  },
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Cohort',
    jobId: 'Cohort',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      coreHours: 5,
      cpuUtilization: 50,
      id: 'asdasd',
      jobRunId: 'asdasd',
      memoryUtilization: 50,
      numberOfCores: 5,
      runtime: 5,
      utilization: 50,
      usedMemory: 5,
      waitingTime: 5,
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
    expect(formatted.bodyData[0].coreHours).toBe('5 Hrs.');
  });
});
