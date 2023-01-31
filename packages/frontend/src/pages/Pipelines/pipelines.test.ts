import { dataFormatterCallback, PipelineAllResponse } from './helpers';
const responseDataFallback: PipelineAllResponse[] = [
  {
    pipelineId: 'Monty Grail',
    lastRunDate: '2022-09-05 08:23:25.960',
    numberOfJobs: 3,
    avgRuntime: 2,
    lastRunRuntime: 2,
  },
  {
    pipelineId: 'Monty Python',
    lastRunDate: '2022-09-05 08:23:25.960',
    numberOfJobs: 3,
    avgRuntime: 2,
    lastRunRuntime: 2,
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
