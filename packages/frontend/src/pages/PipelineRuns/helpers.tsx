import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { getTableColumnDefinition } from '../../constants/table-columns';

import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';
import { OverviewItem } from '../../stories/Overview/Overview';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';

export type PipelineRunResponse = {
  id: string;
  pipelineId: string;
  totalRuntime: number;
  numberOfJobs: number;
  totalCoreHours: number;
  avgWaitingTime: number;
  avgUtilization: number;
  avgCpuUtilization: number;
  avgMemoryUtilization: number;
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
      fields: ['date', 'totalRuntime', 'totalCoreHours', 'avgUtilization'],
      ctaText: 'Explore',
      onCtaClick: ({ id }) =>
        navigate(`/pipeline/${pipelineId}/runs/${id}/jobs`),
    }),
    bodyData: responseData.map((rd) => ({
      name: rd.pipelineId,
      id: rd.pipelineId,
      date: formatDate(rd.date),
      totalRuntime: formatField({
        fieldName: 'totalRuntime',
        fieldValue: rd.totalRuntime,
      }),
      totalCoreHours: formatField({
        fieldName: 'totalCoreHours',
        fieldValue: rd.totalCoreHours,
      }),
      avgUtilization: formatField({
        fieldName: 'avgUtilization',
        fieldValue: rd.avgUtilization,
      }),
    })),
  };
}

const overviewItems = ['totalRuntime', 'avgUtilization', 'totalCoreHours'];

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
