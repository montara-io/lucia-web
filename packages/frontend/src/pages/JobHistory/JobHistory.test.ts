import { jobsFallback, formatOverview, formatLineChartData } from './helpers';

describe('Job History', () => {
  it('should format overview items', () => {
    const result = formatOverview(jobsFallback);
    expect(result[0].score).toBe(20);
  });
  it('should format the line chart data', () => {
    const result = formatLineChartData(jobsFallback);
    expect(result).toHaveLength(1);
  });
});
