import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';

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
    headerData: getCommonTableHeaders({
      fields: ['jobId', 'avgUtilization', 'avgRuntime', 'avgCoreHours'],
      ctaText: 'Job History',
      onCtaClick: (data) => {
        navigate(Routes.JobHistory.replace(':jobId', data.jobId));
      },
    }),

    bodyData: responseData.map((rd) => ({
      jobId: rd.jobId,
      avgUtilization: formatField({
        fieldName: 'avgUtilization',
        fieldValue: rd.sparkJobMetrics?.avgUtilization,
      }),
      avgRuntime: formatField({
        fieldName: 'avgRuntime',
        fieldValue: rd.sparkJobMetrics?.avgRuntime,
      }),
      avgCoreHours: formatField({
        fieldName: 'avgCoreHours',
        fieldValue: rd.sparkJobMetrics?.avgCoreHours,
      }),
    })),
  };
}
