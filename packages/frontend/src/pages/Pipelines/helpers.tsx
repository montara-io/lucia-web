import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { ColumnName } from '../../constants/table-columns';
import { formatColumn, getCommonTableHeaders } from '../../services/table';

export type PipelineAllResponse = {
  pipelineId: string;
  lastRunDate: string;
  numberOfJobs: number;
  avgRuntime: number;
  lastRunRuntime: number;
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
        ColumnName.AvgRuntime,
        ColumnName.lastRunRuntime,
        ColumnName.lastRunDate,

        // Last run date, last run duration, avg duration, number of jobs,
      ],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineId }) =>
        navigate(Routes.PipelineRuns.replace(':pipelineId', pipelineId)),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineId: rd.pipelineId,
      lastRunDate: formatColumn({
        columnName: ColumnName.lastRunDate,
        dataObject: rd,
      }),
      numberOfJobs: rd.numberOfJobs,
      avgDuration: formatColumn({
        columnName: ColumnName.AvgRuntime,
        dataObject: rd,
      }),
      lastRunDuration: formatColumn({
        columnName: ColumnName.lastRunRuntime,
        dataObject: rd,
      }),
    })),
  };
}
