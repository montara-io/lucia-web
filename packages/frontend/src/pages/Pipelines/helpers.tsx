import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import { formatColumn, getCommonTableHeaders } from '../../services/table';
import { formatDate } from '../../utils/date';

export type PipelineAllResponse = {
  id: string;
  pipelineId: string;
  avgRuntime: number;
  numberOfJobs: number;
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
  startDate: string;
  endDate: string;
  duration: number;
};

export function dataFormatterCallback(params: {
  responseData: PipelineAllResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [
        ColumnName.pipelineId,
        ColumnName.lastRunDate,

        // Last run date, last run duration, avg duration, number of jobs,
      ],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineId }) =>
        navigate(Routes.PipelineRuns.replace(':pipelineId', pipelineId)),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineId: rd.pipelineId,
      id: rd.pipelineId,
      lastRunDate: formatDate(rd.startDate),
      avgTotalBytesRead: formatColumn({
        columnName: ColumnName.avgTotalBytesRead,
        dataObject: rd,
      }),
      avgTotalBytesWritten: formatColumn({
        columnName: ColumnName.avgTotalBytesWritten,
        dataObject: rd,
      }),
      avgTotalCpuUptime: `${rd.avgTotalCpuUptime} Hrs.`,
    })),
  };
}
