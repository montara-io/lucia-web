import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import { formatColumn, getCommonTableHeaders } from '../../services/table';
import { JobRun } from '../../types/JobRun';

const TableFields = [
  ColumnName.Duration,
  ColumnName.NumOfExecutors,
  ColumnName.TotalMemoryPerExecutor,
  ColumnName.TotalBytesRead,
  ColumnName.TotalBytesWritten,
  ColumnName.TotalShuffleRead,
  ColumnName.TotalShuffleWrite,
  ColumnName.TotalCpuTimeUsed,
  ColumnName.TotalCpuUptime,
  ColumnName.PeakMemoryUsage,
  ColumnName.TotalCoresNum,
  ColumnName.CpuUtilization,
];

function createColumnsFromTableFields(
  tableFields: string[],
  responseData: JobRun,
) {
  const result = {};
  tableFields.forEach((field) => {
    result[field] = formatColumn({
      columnName: field as ColumnName,
      dataObject: responseData.sparkJobRunMetrics,
    });
  });
  return result;
}

export function dataFormatterCallback(params: {
  responseData: JobRun[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [ColumnName.jobId].concat(TableFields),
      ctaText: 'Job History',
      onCtaClick: (data) => {
        navigate(Routes.JobHistory.replace(':jobId', data.jobId));
      },
    }),
    bodyData: responseData.map((rd) => ({
      jobId: rd.jobId,
      ...createColumnsFromTableFields(TableFields, rd),
    })),
  };
}
