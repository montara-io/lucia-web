import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import { TABLE_COLUMNS } from '../../constants/table-columns';
import { HeaderRow } from '../../stories/DataTable/DataTable';
import { formatDate } from '../../utils/date';

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
  const headerData: HeaderRow[] = [
    'pipelineId',
    'totalRuntime',
    'lastRunDate',
    'avgCoreHours',
  ].map((c) => ({
    field: c,
    title: TABLE_COLUMNS[c].title,
    sortable: TABLE_COLUMNS[c].sortable || false,
    sortType: TABLE_COLUMNS[c].sortType,
    sortField: c,
  }));
  return {
    headerData: headerData.concat([
      {
        field: 'explore',
        title: '',
        headerStyle: {
          cellWidth: '12rem',
        },
        template: ({ id }) => (
          <ExploreButton
            onClick={() => {
              navigate(Routes.PipelineRuns.replace(':pipelineId', id));
            }}
            text={'Explore'}
          />
        ),
      },
    ]),

    bodyData: responseData.map((rd) => ({
      pipelineId: rd.pipelineId,
      id: rd.pipelineId,
      lastRunDate: formatDate(rd.date),
      totalRuntime: `${rd.avgRuntime} Hrs.`,
      avgRuntime: rd.avgUtilization,
      avgCoreHours: `${rd.totalCoreHours} Hrs.`,
      avgWaitingTime: `${rd.avgWaitingTime} Hrs.`,
    })),
  };
}
