import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import { formatColumn, getCommonTableHeaders } from '../../services/table';

export type JobAllResponse = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  date: string;
  sparkJobMetrics: {
    jobRunId: string;
    avgNumOfExecutors: number;
    avgTotalMemoryPerExecutor: number;
    avgTotalBytesRead: number;
    avgTotalBytesWritten: number;
    avgTotalShuffleRead: number;
    avgTotalShuffleWrite: number;
    avgTotalCpuTimeUsed: number;
    avgTotalCpuUptime: number;
    avgPeakMemoryUsage: number;
    avgTotalCoresNum: number;
    avgCpuUtilization: number;
  };
};

export function dataFormatterCallback(params: {
  responseData: JobAllResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [
        ColumnName.jobId,
        ColumnName.AvgTotalCpuUptime,
        ColumnName.avgTotalBytesRead,
        ColumnName.avgTotalBytesWritten,
      ],
      ctaText: 'Job History',
      onCtaClick: (data) => {
        navigate(Routes.JobHistory.replace(':jobId', data.jobId));
      },
    }),

    bodyData: responseData.map((rd) => ({
      jobId: rd.jobId,
      avgNumOfExecutors: formatColumn({
        columnName: ColumnName.AvgNumOfExecutors,
        dataObject: rd.sparkJobMetrics,
      }),
      avgTotalBytesRead: formatColumn({
        columnName: ColumnName.avgTotalBytesRead,
        dataObject: rd.sparkJobMetrics,
      }),
      avgTotalBytesWritten: formatColumn({
        columnName: ColumnName.avgTotalBytesWritten,
        dataObject: rd.sparkJobMetrics,
      }),
      avgTotalCpuUptime: formatColumn({
        columnName: ColumnName.AvgTotalCpuUptime,
        dataObject: rd.sparkJobMetrics,
      }),
    })),
  };
}
