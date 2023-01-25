import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';
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
  date: string; // ISO date string
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
        ColumnName.avgTotalCpuUptime,
        ColumnName.avgTotalBytesRead,
        ColumnName.avgTotalBytesWritten,
      ],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineId }) =>
        navigate(Routes.PipelineRuns.replace(':pipelineId', pipelineId)),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineId: rd.pipelineId,
      id: rd.pipelineId,
      lastRunDate: formatDate(rd.date),
      avgTotalBytesRead: formatField({
        fieldName: 'avgTotalBytesRead',
        fieldValue: rd.avgTotalBytesRead,
      }),
      avgTotalBytesWritten: formatField({
        fieldName: 'avgTotalBytesWritten',
        fieldValue: rd.avgTotalBytesWritten,
      }),

      avgTotalCpuUptime: `${rd.avgTotalCpuUptime} Hrs.`,
    })),
  };
}
