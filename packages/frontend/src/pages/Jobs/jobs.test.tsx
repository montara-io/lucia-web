import { dataFormatterCallback, responseDataFallback } from './helpers';

describe('Jobs Page', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('jobId');
    expect(formatted.bodyData[0].avgRuntime).toBe('5 Hrs.');
  });
});
