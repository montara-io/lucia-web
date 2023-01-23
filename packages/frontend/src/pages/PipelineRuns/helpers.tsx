import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { OverviewItem } from '../../stories/Overview/Overview';
import { arrayAverage } from '../../utils/arrays';

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

export const responseDataFallback: PipelineRunResponse[] = [
  {
    pipelineId: 'Monty Python 02/01',
    id: 'Monty Python 02/01',
    date: '2022-09-05T08:23:25.960Z',
    totalRuntime: 2,
    totalCoreHours: 2,
    avgWaitingTime: 2,
    avgCpuUtilization: 1,
    avgUtilization: 2,
    avgMemoryUtilization: 2,
    numberOfJobs: 24,
  },
  {
    pipelineId: 'Monty Python 03/01',
    id: 'Monty Python 03/01',
    date: '2022-09-05T08:23:25.960Z',
    totalRuntime: 2,
    totalCoreHours: 2,
    avgWaitingTime: 2,
    avgCpuUtilization: 1,
    avgUtilization: 2,
    avgMemoryUtilization: 2,
    numberOfJobs: 24,
  },
];

export function dataFormatterCallback(params: {
  responseData: PipelineRunResponse[];
  navigate: any;
  pipelineId: string;
}): DataFormatterResponse {
  const { responseData, navigate, pipelineId } = params;

  return {
    headerData: [
      {
        field: 'name',
        title: 'Pipeline Name',
        sortType: 'string',
        placeholder: 'Search',
        sortable: true,
        sortField: 'name',
      },
      {
        field: 'date',
        title: 'date',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'totalRuntime',
        title: 'Total Runtime',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'totalCoreHours',
        title: 'Core Hours',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'avgWaitingTime',
        title: 'Avg. Waiting Time',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'avgUtilization',
        title: 'Avg. Utilization',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'explore',
        title: '',
        sortType: 'string',
        sortable: false,
        headerStyle: {
          cellWidth: '12rem',
        },
        template: ({ id }) => {
          return (
            <ExploreButton
              onClick={() =>
                navigate(`/pipeline/${pipelineId}/runs/${id}/jobs`)
              }
              text={'Explore Jobs'}
            />
          );
        },
      },
    ],
    bodyData: (responseData || responseDataFallback).map((rd) => ({
      name: rd.pipelineId,
      id: rd.pipelineId,
      date: rd.date.split('T')[0],
      totalRuntime: `${rd.totalRuntime} Hrs.`,
      avgRuntime: rd.avgUtilization,
      totalCoreHours: rd.totalCoreHours,
      avgWaitingTime: `${rd.avgWaitingTime} Hrs.`,
      avgUtilization: `${rd.avgUtilization}%`,
    })),
  };
}

const dataToOverview = [
  {
    title: 'Total Runtime',
    field: 'totalRuntime',
  },
  {
    title: 'Avg. Utilization',
    field: 'avgUtilization',
  },
  {
    title: 'Core Hours',
    field: 'totalCoreHours',
  },
  {
    title: 'Avg. Waiting Time',
    field: 'avgWaitingTime',
  },
];

export function formatOverview(
  pipelineRuns: PipelineRunResponse[],
): OverviewItem[] {
  return dataToOverview.map((data) => ({
    title: data.title,
    score: arrayAverage(
      pipelineRuns.map((pipelineRun) => pipelineRun[data.field] || 0),
    ),
  }));
  // return [
  //   {
  //     title: 'Total Runtime',
  //     score: arrayAverage(
  //       pipelineRuns.map((pipelineRun) => pipelineRun.totalRuntime || 0),
  //     ),
  //   },
  //   {
  //     title: 'Avg. Utilization',
  //     score: `${arrayAverage(
  //       pipelineRuns.map((pipelineRun) => pipelineRun.avgUtilization || 0),
  //     )}%`,
  //   },
  //   {
  //     title: 'Avg. Utilization',
  //     score: `${arrayAverage(
  //       pipelineRuns.map((pipelineRun) => pipelineRun.avgUtilization || 0),
  //     )}%`,
  //   },
  //   {
  //     title: 'Avg. Utilization',
  //     score: `${arrayAverage(
  //       pipelineRuns.map((pipelineRun) => pipelineRun.avgUtilization || 0),
  //     )}%`,
  //   },
  //   {
  //     title: 'Avg. Utilization',
  //     score: `${arrayAverage(
  //       pipelineRuns.map((pipelineRun) => pipelineRun.avgUtilization || 0),
  //     )}%`,
  //   },
  // ];
}
