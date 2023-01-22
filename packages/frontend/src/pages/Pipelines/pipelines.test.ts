import { dataFormatterCallback } from './helpers';

describe('data formatting', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      id: 'monty',
      pipelineId: 'monty',
      totalRuntime: 20,
      numberOfJobs: 20,
      totalCoreHours: 0,
      avgWaitingTime: 0,
      avgUtilization: 0,
      avgCpuUtilization: 0,
      avgMemoryUtilization: 0,
    });
    expect(formatted.headerData[0].field).toBe('name');
    expect(formatted.bodyData[0].lastRunDate).toBe('01-01-2022');
  });
});
