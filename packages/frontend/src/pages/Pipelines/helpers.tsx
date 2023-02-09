import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import {
  formatColumn,
  getCommonTableHeaders,
} from '../../services/table/table.service';

export type PipelineAllResponse = {
  pipelineId: string;
  lastRunDate: string;
  numberOfJobs: number;
  avgDuration: number;
  lastRunDuration: number;
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
        ColumnName.numberOfJobs,
        ColumnName.AvgDuration,
        ColumnName.lastRunDuration,
        ColumnName.LastRunDate,

        // Last run date, last run duration, avg duration, number of jobs,
      ],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineId }) =>
        navigate(Routes.PipelineRuns.replace(':pipelineId', pipelineId)),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineId: rd.pipelineId,
      lastRunDate: formatColumn({
        columnName: ColumnName.LastRunDate,
        dataObject: rd,
      }),
      numberOfJobs: rd.numberOfJobs,
      avgDuration: formatColumn({
        columnName: ColumnName.AvgDuration,
        dataObject: rd,
      }),
      lastRunDuration: formatColumn({
        columnName: ColumnName.lastRunDuration,
        dataObject: rd,
      }),
    })),
  };
}
