import { formatColumn, formatDuration, formatStorage } from './table.service';
import { ColumnName } from './../../constants/table-columns';

describe('Table Service', () => {
  it('should format field data - storage type', () => {
    const columnName = ColumnName.TotalBytesRead;
    const dataObject = { [ColumnName.TotalBytesRead]: 1234567890 };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('1.15 GB');
  });

  it('should format field data - date', () => {
    const columnName = ColumnName.LastRunDate;
    const dataObject = { [ColumnName.LastRunDate]: '2022-09-05 08:23:25.960' };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('09/05/22, 8:23 AM');
  });

  it('should format field data - duration', () => {
    const columnName = ColumnName.AvgDuration;
    const dataObject = { [ColumnName.AvgDuration]: 0.5 };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('30 Mins.');
  });

  it('should format field data - duration seconds', () => {
    expect(formatDuration(0.07)).toBe('4 Mins.');
  });

  it('should format storage', () => {
    expect(formatStorage(1234567890)).toBe('1.15 GB');
    expect(formatStorage('4571')).toBe('4.46 KB');
  });
});
