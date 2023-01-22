import { dataFormatterCallback, responseDataFallback } from './helpers';

describe('data formatting', () => {
  it('should format data', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('name');
    expect(formatted.bodyData[0].totalRuntime).toBe('20 Hrs.');
  });
});
