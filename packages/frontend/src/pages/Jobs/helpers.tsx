import ExploreButton from '../../components/common/ExploreButton';
import { DataFormatterResponse } from '../../components/common/PageWithTable';

export type JobAllResponse = {
  jobId: string;
  sparkJobMetrics?: {
    avgUtilization: number;
    avgRuntime: number;
    avgWaitingTime: number;
    avgCoreHours: number;
  };
};

export const responseDataFallback: JobAllResponse[] = [
  {
    jobId: 'Cohort',
    sparkJobMetrics: {
      avgCoreHours: 5,
      avgRuntime: 5,
      avgUtilization: 50,
      avgWaitingTime: 5,
    },
  },
  {
    jobId: 'Feature Engine',
    sparkJobMetrics: {
      avgCoreHours: 5,
      avgRuntime: 5,
      avgUtilization: 50,
      avgWaitingTime: 5,
    },
  },
];

export function dataFormatterCallback(params: {
  responseData: JobAllResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: [
      {
        field: 'jobId',
        title: 'Job Name',
      },
      {
        field: 'avgUtilization',
        title: 'Avg. Utilization',
      },
      {
        field: 'avgRuntime',
        title: 'Avg. Runtime',
      },
      {
        field: 'avgWaitingTime',
        title: 'Avg. Waiting Time',
      },
      {
        field: 'avgCoreHours',
        title: 'Avg. Core Hours',
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
            text={'Explore'}
          />
        ),
      },
    ],
    bodyData: (responseData || responseDataFallback).map((rd) => ({
      jobId: rd.jobId,
      avgUtilization: rd.sparkJobMetrics?.avgUtilization,
      avgRuntime: `${rd.sparkJobMetrics?.avgRuntime} Hrs.`,
      avgWaitingTime: rd.sparkJobMetrics?.avgWaitingTime,
      avgCoreHours: rd.sparkJobMetrics?.avgCoreHours,
    })),
  };
}
