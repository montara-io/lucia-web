import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { ColumnName } from '../../constants/table-columns';

import {
  formatColumn,
  getCommonTableHeaders,
  getTableColumnDefinition,
} from '../../services/table/table.service';
import { OverviewItem } from '../../stories/Overview/Overview';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';

export type PipelineRunResponse = {
  pipelineRunId: string;
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
  responseData: PipelineRunResponse[];
  navigate: any;
  pipelineId: string;
}): DataFormatterResponse {
  const { responseData, navigate, pipelineId } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [ColumnName.Date, ColumnName.Duration, ColumnName.numberOfJobs],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineRunId }) =>
        navigate(`/pipeline/${pipelineId}/runs/${pipelineRunId}/jobs`),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineRunId: rd.pipelineRunId,
      date: formatDate(rd.startDate),
      runtime: formatColumn({
        columnName: ColumnName.Duration,
        dataObject: rd,
      }),
      duration: formatColumn({
        columnName: ColumnName.Duration,
        dataObject: rd,
      }),
      numberOfJobs: rd.numberOfJobs,
    })),
  };
}

const overviewItems = [ColumnName.numberOfJobs, ColumnName.Duration];

export function formatOverview(
  pipelineRuns: PipelineRunResponse[],
): OverviewItem[] {
  const prefix: OverviewItem[] = [
    {
      title: 'Number of Runs',
      score: pipelineRuns.length,
      tooltip: 'How many times the job was triggered',
    },
  ];
  return prefix.concat(
    overviewItems.map((oi) => ({
      title: getTableColumnDefinition(oi).title,
      tooltip: getTableColumnDefinition(oi).helpIconText,
      score: formatColumn({
        columnName: oi,
        columnValue: arrayAverage(
          pipelineRuns.map((pipelineRun) => pipelineRun[oi] || 0),
          5,
        ),
      }),
    })),
  );
}
