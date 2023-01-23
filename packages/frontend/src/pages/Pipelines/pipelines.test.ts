import { dataFormatterCallback, PipelineAllResponse } from './helpers';
const responseDataFallback: PipelineAllResponse[] = [
  {
    id: 'Monty Grail',
    pipelineId: 'Monty Grail',
    date: '2022-09-05T08:23:25.960Z',
    avgRuntime: 20,
    totalCoreHours: 56,
    avgCpuUtilization: 50,
    avgMemoryUtilization: 50,
    avgUtilization: 50,
    avgWaitingTime: 5,
    numberOfJobs: 3,
  },
  {
    id: 'Monty Python',
    pipelineId: 'Monty Python',
    date: '2022-09-05T08:23:25.960Z',
    avgRuntime: 20,
    totalCoreHours: 56,
    avgCpuUtilization: 50,
    avgMemoryUtilization: 50,
    avgUtilization: 50,
    avgWaitingTime: 5,
    numberOfJobs: 3,
  },
];
describe('data formatting', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('pipelineId');
    expect(formatted.bodyData[0].avgRuntime).toBe('20 Hrs.');
  });
});
