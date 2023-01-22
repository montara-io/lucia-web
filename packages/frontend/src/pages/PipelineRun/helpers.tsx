import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';

export type JobByPipelineRunIdResponse = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  date: Date;
  sparkJobMetrics?: {
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
    date: new Date('01-01-2022'),
    id: 'Feature Engine',
    jobId: 'Feature Engine',
    pipelineRunId: 'asdasd',
    sparkJobMetrics: {
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
    date: new Date('01-01-2022'),
    id: 'Cohort',
    jobId: 'Cohort',
    pipelineRunId: 'asdasd',
    sparkJobMetrics: {
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
        field: 'job',
        title: 'Job',
        sortType: 'string',
        placeholder: 'SEARCH',
        sortable: true,
        sortField: 'job',
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
        template: () => (
          <ExploreButton
            onClick={() => navigate('/job/123')}
            text={'Job History'}
          />
        ),
      },
    ],
    bodyData: responseData.map((rd) => ({
      job: rd.jobId,
      ramUtilization: rd.sparkJobMetrics?.memoryUtilization,
      cpuUtilization: rd.sparkJobMetrics?.cpuUtilization,
      runtime: rd.sparkJobMetrics?.runtime,
      coreHours: rd.sparkJobMetrics?.coreHours,
      waitingTime: rd.sparkJobMetrics?.waitingTime,
    })),
  };
}
