import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';

export type JobByPipelineRunIdResponse = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  date: string;
  sparkJobRunMetrics?: {
    id: string;
    jobRunId: string;
    numOfExecutors: number;
    totalMemoryPerExecutor: number;
    totalBytesRead: number;
    totalBytesWritten: number;
    totalShuffleRead: number;
    totalShuffleWrite: number;
    totalCpuTimeUsed: number;
    totalCpuUptime: number;
    peakMemoryUsage: number;
    totalCoresNum: number;
  };
};

export function dataFormatterCallback(params: {
  responseData: JobByPipelineRunIdResponse[];
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
      totalBytesRead: formatField({
        fieldName: ColumnName.TotalBytesRead,
        fieldValue: rd.sparkJobRunMetrics?.totalBytesRead,
      }),
      totalBytesWritten: formatField({
        fieldName: ColumnName.TotalBytesWritten,
        fieldValue: rd.sparkJobRunMetrics?.totalBytesRead,
      }),
    })),
  };
}
