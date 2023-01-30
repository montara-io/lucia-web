import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { ColumnName } from '../../constants/table-columns';

import {
  formatField,
  getCommonTableHeaders,
  getTableColumnDefinition,
} from '../../services/table.service';
import { OverviewItem } from '../../stories/Overview/Overview';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';

export type PipelineRunResponse = {
  pipelineRunId: string;
  pipelineId: string;
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
  date: string;
};

export function dataFormatterCallback(params: {
  responseData: PipelineRunResponse[];
  navigate: any;
  pipelineId: string;
}): DataFormatterResponse {
  const { responseData, navigate, pipelineId } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [
        ColumnName.date,
        ColumnName.avgTotalCpuUptime,
        ColumnName.avgTotalBytesRead,
        ColumnName.avgTotalBytesWritten,

        // Only Start date, duration (Hrs), nubmer of jobs, \
        // Overview: number of runs,
      ],
      ctaText: 'Explore',
      onCtaClick: ({ pipelineRunId }) =>
        navigate(`/pipeline/${pipelineId}/runs/${pipelineRunId}/jobs`),
    }),
    bodyData: responseData.map((rd) => ({
      pipelineRunId: rd.pipelineRunId,
      date: formatDate(rd.date),
      avgTotalCpuUptime: formatField({
        fieldName: 'avgTotalCpuUptime',
        fieldValue: rd.avgTotalCpuUptime,
      }),
      avgTotalBytesRead: formatField({
        fieldName: 'avgTotalBytesRead',
        fieldValue: rd.avgTotalBytesRead,
      }),
      avgTotalBytesWritten: formatField({
        fieldName: 'avgTotalBytesWritten',
        fieldValue: rd.avgTotalBytesWritten,
      }),
    })),
  };
}

const overviewItems = [
  ColumnName.numberOfJobs,
  ColumnName.avgTotalCpuUptime,
  ColumnName.avgTotalBytesRead,
  ColumnName.avgTotalBytesWritten,
];

export function formatOverview(
  pipelineRuns: PipelineRunResponse[],
): OverviewItem[] {
  const prefix: OverviewItem[] = [
    {
      title: 'Num. of Runs',
      score: pipelineRuns.length,
      tooltip: 'How many times the job was triggered',
    },
  ];
  return prefix.concat(
    overviewItems.map((oi) => ({
      title: getTableColumnDefinition(oi).title,
      tooltip: getTableColumnDefinition(oi).helpIconText,
      score: formatField({
        fieldName: oi,
        fieldValue: arrayAverage(
          pipelineRuns.map((pipelineRun) => pipelineRun[oi] || 0),
        ),
      }),
    })),
  );
}
