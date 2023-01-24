import { DataFormatterResponse } from '../../components/common/PageWithTable';
import { Routes } from '../../constants/routes';
import {
  formatField,
  getCommonTableHeaders,
} from '../../services/table.service';

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

export function dataFormatterCallback(params: {
  responseData: JobByPipelineRunIdResponse[];
  navigate: any;
}): DataFormatterResponse {
  const { responseData, navigate } = params;

  return {
    headerData: getCommonTableHeaders({
      fields: [
        'jobId',
        'ramUtilization',
        'cpuUtilization',
        'runtime',
        'coreHours',
      ],
      ctaText: 'Job History',
      onCtaClick: (data) => {
        navigate(Routes.JobHistory.replace(':jobId', data.jobId));
      },
    }),
    bodyData: responseData.map((rd) => ({
      jobId: rd.jobId,
      ramUtilization: formatField({
        fieldName: 'ramUtilization',
        fieldValue: rd.sparkJobRunMetrics?.memoryUtilization,
      }),
      cpuUtilization: formatField({
        fieldName: 'cpuUtilization',
        fieldValue: rd.sparkJobRunMetrics?.cpuUtilization,
      }),
      runtime: formatField({
        fieldName: 'runtime',
        fieldValue: rd.sparkJobRunMetrics?.runtime,
      }),

      coreHours: formatField({
        fieldName: 'coreHours',
        fieldValue: rd.sparkJobRunMetrics?.coreHours,
      }),
    })),
  };
}
