import { dataFormatterCallback, responseDataFallback } from './helpers';

describe('Pipeline Run component', () => {
  it('should format data correctly', () => {
    const formatted = dataFormatterCallback({
      responseData: responseDataFallback,
      navigate: () => {},
    });
    expect(formatted.headerData[0].field).toBe('job');
    expect(formatted.bodyData[0].coreHours).toBe(5);
  });
});
