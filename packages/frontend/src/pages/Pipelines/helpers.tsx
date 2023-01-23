import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';

export type PipelineAllResponse = {
  id: string;
  pipelineId: string;
  avgRuntime: number;
  numberOfJobs: number;
  totalCoreHours: number;
  avgWaitingTime: number;
  avgUtilization: number;
  avgCpuUtilization: number;
  avgMemoryUtilization: number;
  date: string;
};

export const responseDataFallback: PipelineAllResponse[] = [
  {
    id: 'Monty Grail',
    pipelineId: 'Monty Grail',
    date: '2022-09-05T08:23:25.960Z',
    avgRuntime: 20,
    totalCoreHours: 56,
    avgCpuUtilization: 50,
    avgMemoryUtilization: 50,
    avgUtilization: 50,
    avgWaitingTime: 5,
    numberOfJobs: 3,
  },
  {
    id: 'Monty Python',
    pipelineId: 'Monty Python',
    date: '2022-09-05T08:23:25.960Z',
    avgRuntime: 20,
    totalCoreHours: 56,
    avgCpuUtilization: 50,
    avgMemoryUtilization: 50,
    avgUtilization: 50,
    avgWaitingTime: 5,
    numberOfJobs: 3,
  },
];

export function dataFormatterCallback(params: {
  responseData: PipelineAllResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: [
      {
        field: 'name',
        title: 'Pipeline Name',
        placeholder: 'Search',
      },
      {
        field: 'totalRuntime',
        title: 'Total Runtime',
      },
      {
        field: 'lastRunDate',
        title: 'Last run date',
      },

      {
        field: 'avgCoreHours',
        title: 'Avg. Core Hours',
      },
      {
        field: 'avgWaitingTime',
        title: 'Avg. Waiting Time',
      },
      {
        field: 'explore',
        title: '',
        headerStyle: {
          cellWidth: '12rem',
        },
        template: ({ id }) => (
          <ExploreButton
            onClick={() => {
              navigate(`/pipeline/${id}/runs`);
            }}
            text={'Explore'}
          />
        ),
      },
    ],
    bodyData: responseData.map((rd) => ({
      name: rd.pipelineId,
      id: rd.pipelineId,
      lastRunDate: rd.date.split('T')[0],
      totalRuntime: `${rd.avgRuntime} Hrs.`,
      avgRuntime: rd.avgUtilization,
      avgCoreHours: rd.avgCpuUtilization,
      avgWaitingTime: `${rd.avgWaitingTime} Hrs.`,
    })),
  };
}
