import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';

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
        ColumnName.avgTotalCpuUptime,
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
      avgNumOfExecutors: formatField({
        fieldName: ColumnName.avgNumOfExecutors,
        fieldValue: rd.sparkJobMetrics.avgNumOfExecutors,
      }),
      avgTotalBytesRead: formatField({
        fieldName: ColumnName.avgTotalBytesRead,
        fieldValue: rd.sparkJobMetrics.avgTotalBytesRead,
      }),
      avgTotalBytesWritten: formatField({
        fieldName: ColumnName.avgTotalBytesWritten,
        fieldValue: rd.sparkJobMetrics.avgTotalBytesWritten,
      }),
      avgTotalCpuUptime: formatField({
        fieldName: ColumnName.avgTotalCpuUptime,
        fieldValue: rd.sparkJobMetrics.avgTotalCpuUptime,
      }),
    })),
  };
}
