import { dataFormatterCallback } from './helpers';

describe('data formatting', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: [
        {
          id: 'monty',
          pipelineId: 'monty',
          avgRuntime: 20,
          numberOfJobs: 20,
          totalCoreHours: 0,
          avgWaitingTime: 0,
          avgUtilization: 0,
          avgCpuUtilization: 0,
          avgMemoryUtilization: 0,
          date: new Date(),
        },
      ],
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('name');
    expect(formatted.bodyData[0].totalRuntime).toBe('20 Hrs.');
  });
});
