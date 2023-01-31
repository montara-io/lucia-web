import { formatColumn } from '.';
import { ColumnName } from './../../constants/table-columns';

describe('Table Service', () => {
  it('should format field data - storage type', () => {
    const columnName = ColumnName.TotalBytesRead;
    const dataObject = { [ColumnName.TotalBytesRead]: 1234567890 };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('1234567890 Bytes');
  });

  it('should format field data - date', () => {
    const columnName = ColumnName.lastRunDate;
    const dataObject = { [ColumnName.lastRunDate]: '2022-09-05 08:23:25.960' };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('09/05/22, 8:23 AM');
  });

  it('should format field data - duration', () => {
    const columnName = ColumnName.avgRuntime;
    const dataObject = { [ColumnName.avgRuntime]: 0.5 };
    const formatted = formatColumn({ columnName, dataObject });
    expect(formatted).toEqual('30 Mins.');
  });
});
