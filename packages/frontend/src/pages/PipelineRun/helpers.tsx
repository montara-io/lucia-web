import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { formatDate } from '../../utils/date';

export type JobByPipelineRunIdResponse = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  date: string;
  sparkJobRunMetrics?: {
    id: string;
    jobRunId: string;
    utilization: number;
    runtime: number;
    waitingTime: number;
    coreHours: number;
    usedMemory: number;
    numberOfCores: number;
    cpuUtilization: number;
    memoryUtilization: number;
  };
};

export const responseDataFallback: JobByPipelineRunIdResponse[] = [
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      coreHours: 5,
      cpuUtilization: 50,
      id: 'asdasd',
      jobRunId: 'asdasd',
      memoryUtilization: 50,
      numberOfCores: 5,
      runtime: 5,
      utilization: 50,
      usedMemory: 5,
      waitingTime: 5,
    },
  },
  {
    date: '2022-09-05T08:23:25.960Z',
    id: 'Cohort',
    jobId: 'Cohort',
    pipelineRunId: 'asdasd',
    sparkJobRunMetrics: {
      coreHours: 5,
      cpuUtilization: 50,
      id: 'asdasd',
      jobRunId: 'asdasd',
      memoryUtilization: 50,
      numberOfCores: 5,
      runtime: 5,
      utilization: 50,
      usedMemory: 5,
      waitingTime: 5,
    },
  },
];

export function dataFormatterCallback(params: {
  responseData: JobByPipelineRunIdResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: [
      {
        field: 'jobId',
        title: 'Job',
        sortType: 'string',
        placeholder: 'SEARCH',
        sortable: true,
        sortField: 'job',
      },
      {
        field: 'date',
        title: 'Run Date',
        sortType: 'string',
        sortable: true,
        sortField: 'date',
      },

      {
        field: 'ramUtilization',
        title: 'RAM Utilization',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'cpuUtilization',
        title: 'CPU Utilization',
        sortType: 'string',
        sortable: true,
        sortField: 'cpuUtilization',
      },
      {
        field: 'runtime',
        title: 'Runtime',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'coreHours',
        title: 'Core Hours',
        sortType: 'string',
        sortable: true,
      },
      {
        field: 'waitingTime',
        title: 'Waiting Time',
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
        template: ({ jobId }) => (
          <ExploreButton
            onClick={() => navigate(`/job/${jobId}`)}
            text={'Job History'}
          />
        ),
      },
    ],
    bodyData: responseData.map((rd) => ({
      jobId: rd.jobId,
      date: formatDate(rd.date),
      ramUtilization: `${rd.sparkJobRunMetrics?.memoryUtilization}%`,
      cpuUtilization: `${rd.sparkJobRunMetrics?.cpuUtilization}%`,

      runtime: `${rd.sparkJobRunMetrics?.runtime} hrs.`,
      coreHours: rd.sparkJobRunMetrics?.coreHours,
      waitingTime: rd.sparkJobRunMetrics?.waitingTime,
    })),
  };
}
